import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { Ingredient, Recipe } from '../../infrastructure/persistence/schemas';
import { UpdateStockCommand } from './update-stock.command';

@CommandHandler(UpdateStockCommand)
export class UpdateStockHandler implements ICommandHandler<UpdateStockCommand> {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
    @Inject('MARKET_SERVICE') private client: ClientProxy,
  ) {}

  async execute(command: UpdateStockCommand): Promise<void> {
    const recipes = await Promise.all(
      command.recipes.map(async (recipe) => {
        const data = await this.recipeModel.findById(recipe.id).exec();
        return { id: recipe.id, ingredients: data.ingredients };
      }),
    );

    for (const recipe of recipes) {
      console.log('recipe: ', recipe.id);

      for (const { ingredient, quantity } of recipe.ingredients) {
        const data = await this.ingredientModel.findById(ingredient).exec();
        console.log('-------------------');
        console.log(data.name, 'current stock: ', data.stock);
        console.log(data.name, 'required quantity: ', quantity);

        if (data.stock < quantity) {
          console.log('Need to buy more ingredients!');
          const newStock = await this.getIngredientStock(data.name, data.stock, quantity);
          console.log(data.name, 'stock after buying: ', newStock);
          data.stock = newStock;
        }

        data.stock -= quantity;

        console.log(data.name, 'stock after discount quantity: ', data.stock);
        console.log('-------------------');

        await data.save();
      }
    }
  }

  private async getIngredientStock(ingredient: string, currentStock: number, quantity: number) {
    // TODO: Improve the logs
    // TODO: Quizas el totalStock < quantity no funciona porque no parece que se sume el totalStock
    let totalStock = currentStock;

    while (totalStock < quantity) {
      const newStock = await this.buyIngredientStock(ingredient);
      console.log(ingredient, 'stock buy it from the market: ', newStock.quantitySold);
      totalStock += newStock.quantitySold;
    }

    return totalStock;
  }

  private async buyIngredientStock(ingredient: string): Promise<{ quantitySold: number }> {
    // TODO: Move the retry logic to the market microservice
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let retries = 0;
    const maxRetries = 10;

    while (retries < maxRetries) {
      const newIngredient = await lastValueFrom(this.client.send({ cmd: 'buy_ingredient' }, { ingredient }));

      if (newIngredient.quantitySold > 0) {
        return newIngredient;
      }
      retries++;
      await delay(500);
    }

    console.log('no debe llegar aqui');
    throw new Error('Maximum retries exceeded!');
  }
}
