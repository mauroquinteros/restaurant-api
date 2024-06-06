import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from '../../domain/enums';
import { Order } from '../../infrastructure/persistence/schemas';
import { UpdateOrderStatusCommand } from './update-order-status.command';

@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusHandler implements ICommandHandler<UpdateOrderStatusCommand> {
  private readonly logger = new Logger(UpdateOrderStatusHandler.name);

  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async execute(command: UpdateOrderStatusCommand) {
    await this.orderModel
      .updateOne({ _id: command.orderId, state: Status.requested }, { state: Status.preparing })
      .exec();

    this.logger.log(`Order ${command.orderId} status updated to preparing`);
    // TODO: Emitir evento de actualización de stock al WebSocket (requested to preparing)
    this.updateOrderToPrepared(command.orderId);
  }

  async updateOrderToPrepared(orderId: string) {
    setTimeout(async () => {
      try {
        await this.orderModel.updateOne({ _id: orderId, state: Status.preparing }, { state: Status.prepared }).exec();
        // TODO: Emitir evento de actualización de estado al WebSocket (preparing to prepared)
        this.logger.log(`Order ${orderId} status updated to prepared`);
      } catch (error) {
        this.logger.error(`Failed to update order ${orderId} status to prepared`, error.stack);
      }
    }, 5000);
  }
}
