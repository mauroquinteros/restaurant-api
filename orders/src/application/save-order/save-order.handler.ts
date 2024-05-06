import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../infrastructure/persistence/schemas';
import { SaveOrderCommand } from './save-order.command';

@CommandHandler(SaveOrderCommand)
export class SaveOrderHandler implements ICommandHandler<SaveOrderCommand> {
  constructor(@InjectModel(Order.name) private recipeModel: Model<Order>) {}

  async execute(command: SaveOrderCommand): Promise<void> {
    console.log(command);
  }
}
