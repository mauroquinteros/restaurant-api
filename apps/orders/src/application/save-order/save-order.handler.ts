import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { IRecipe } from '../../domain/interfaces';
import { Order } from '../../infrastructure/persistence/schemas';
import { SaveOrderCommand } from './save-order.command';

@CommandHandler(SaveOrderCommand)
export class SaveOrderHandler implements ICommandHandler<SaveOrderCommand> {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject('RECIPES_SERVICE') private client: ClientProxy,
  ) {}

  async execute(command: SaveOrderCommand): Promise<Order> {
    const recipes = await this.getRandomRecipes(command.quantity);

    const order = new this.orderModel({
      quantity: command.quantity,
      state: command.status,
      recipes: recipes,
    });

    const response = await order.save();
    return response;
  }

  private async getRandomRecipes(quantity: number) {
    const recipes: IRecipe[] = await lastValueFrom(this.client.send({ cmd: 'get_recipes' }, {}));
    const randomRecipes: IRecipe[] = [];

    if (recipes.length > 0) {
      for (let i = 0; i < quantity; i++) {
        const randomValue = Math.floor(Math.random() * recipes.length);
        randomRecipes.push(recipes[randomValue]);
      }
    }

    return randomRecipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
    }));
  }
}
