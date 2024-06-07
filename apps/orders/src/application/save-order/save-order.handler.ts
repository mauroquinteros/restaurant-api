import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { Recipes } from '../../domain/entities/recipes';
import { IRecipe } from '../../domain/interfaces';
import { Order } from '../../infrastructure/persistence/schemas';
import { SaveOrderCommand } from './save-order.command';
import { UpdateStockEvent } from './udpate-stock.event';

@CommandHandler(SaveOrderCommand)
export class SaveOrderHandler implements ICommandHandler<SaveOrderCommand> {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject('RECIPES_SERVICE') private client: ClientProxy,
    @Inject('GATEWAY_SERVICE') private wsClient: ClientProxy,
  ) {}

  async execute(command: SaveOrderCommand): Promise<Order> {
    const recipes = await this.getRandomRecipes(command.quantity);

    const order = new this.orderModel({
      quantity: command.quantity,
      state: command.status,
      recipes: recipes,
    });
    const response = await order.save();

    this.wsClient.emit('created_order', response);
    this.client.emit('update_stock', new UpdateStockEvent(order.id, recipes));
    return response;
  }

  private async getRandomRecipes(quantity: number) {
    const recipes: IRecipe[] = await lastValueFrom(this.client.send({ cmd: 'get_recipes' }, {}));
    const randomRecipes = Recipes.getRandomRecipes(quantity, recipes);
    return randomRecipes;
  }
}
