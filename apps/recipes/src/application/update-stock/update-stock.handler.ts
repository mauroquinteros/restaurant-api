import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { Ingredient, Recipe } from '../../infrastructure/persistence/schemas';
import { UpdateOrderStatusEvent } from './udpate-order-status.event';
import { UpdateStockCommand } from './update-stock.command';

@CommandHandler(UpdateStockCommand)
export class UpdateStockHandler implements ICommandHandler<UpdateStockCommand> {
  private readonly logger = new Logger(UpdateStockHandler.name);

  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
    @Inject('MARKET_SERVICE') private marketClient: ClientProxy,
    @Inject('ORDERS_SERVICE') private ordersClient: ClientProxy,
  ) {}

  async execute(command: UpdateStockCommand): Promise<void> {
    const recipes = await Promise.all(
      command.recipes.map(async (recipe) => {
        const data = await this.recipeModel.findById(recipe.id).exec();
        return { id: recipe.id, ingredients: data.ingredients };
      }),
    );

    for (const recipe of recipes) {
      this.logger.log(`Checking the stock for recipe ${recipe.id}`);

      for (const { ingredient, quantity } of recipe.ingredients) {
        const data = await this.ingredientModel.findById(ingredient).exec();
        this.logger.log(`Current stock for ${data.name}: ${data.stock}`);
        this.logger.log(`Required quantity for ${data.name}: ${quantity}`);

        if (data.stock < quantity) {
          data.stock = await this.getIngredientStock(data.name, data.stock, quantity);
          this.logger.log(`Stock for ${data.name} after buying: ${data.stock}`);
        }

        data.stock -= quantity;
        this.logger.log(`Stock for ${data.name} after discount required quantity: ${data.stock}`);
        await data.save();
      }
    }

    this.logger.log(`Updating order status for order ${command.orderId}`);
    this.ordersClient.emit('update_order_status', new UpdateOrderStatusEvent(command.orderId));
  }

  private async getIngredientStock(ingredient: string, currentStock: number, quantity: number) {
    let totalStock = currentStock;

    while (totalStock < quantity) {
      const newStock = await lastValueFrom(this.marketClient.send({ cmd: 'buy_ingredient' }, { ingredient }));
      totalStock += newStock.quantitySold;
    }
    return totalStock;
  }
}
