import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from '../../domain/enums';
import { Order } from '../../persistence/schemas';
import { UpdateOrderStatusCommand } from './update-order-status.command';

@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusHandler implements ICommandHandler<UpdateOrderStatusCommand> {
  private readonly logger = new Logger(UpdateOrderStatusHandler.name);

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject('GATEWAY_SERVICE') private wsClient: ClientProxy,
  ) {}

  async execute(command: UpdateOrderStatusCommand) {
    setTimeout(async () => {
      await this.orderModel
        .updateOne({ _id: command.orderId, state: Status.requested }, { state: Status.preparing })
        .exec();
      this.logger.log(`Order ${command.orderId} status updated to preparing`);
      this.wsClient.emit('preparing_order', { _id: command.orderId });
      this.updateOrderToPrepared(command.orderId);
    }, 10000);
  }

  async updateOrderToPrepared(orderId: string) {
    setTimeout(async () => {
      try {
        await this.orderModel.updateOne({ _id: orderId, state: Status.preparing }, { state: Status.prepared }).exec();
        this.wsClient.emit('prepared_order', { _id: orderId });
        this.logger.log(`Order ${orderId} status updated to prepared`);
      } catch (error) {
        this.logger.error(`Failed to update order ${orderId} status to prepared`, error.stack);
      }
    }, 10000);
  }
}
