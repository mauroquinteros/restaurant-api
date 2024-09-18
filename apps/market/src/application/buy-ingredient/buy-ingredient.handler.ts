import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Market } from '../../persistence/schemas';
import { BuyIngredientCommand } from './buy-ingredient.command';
import { BuyIngredientResponse } from './buy-ingredient.response';

@CommandHandler(BuyIngredientCommand)
export class BuyIngredientHandler implements ICommandHandler<BuyIngredientCommand, BuyIngredientResponse> {
  private readonly logger = new Logger(BuyIngredientHandler.name);
  private MAX_RETRIES = 10;
  private MARKET_URL: URL;

  constructor(private config: ConfigService, @InjectModel(Market.name) private marketModel: Model<Market>) {
    this.MARKET_URL = new URL(this.config.get('marketUrl'));
  }

  async execute(command: BuyIngredientCommand): Promise<BuyIngredientResponse> {
    const response = await this.fetchIngredient(command.ingredient);
    return response;
  }

  private async fetchIngredient(ingredient: string): Promise<{ quantitySold: number }> {
    this.MARKET_URL.searchParams.set('ingredient', ingredient);

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let retries = 0;

    while (retries < this.MAX_RETRIES) {
      const response = await axios.get(this.MARKET_URL.toString());
      const newIngredient = response.data;

      if (newIngredient.quantitySold > 0) {
        await this.saveMarket({ ingredient, quantity: newIngredient.quantitySold });
        return newIngredient;
      }
      retries++;
      await delay(500);
    }

    throw new Error('Maximum retries exceeded!');
  }

  private async saveMarket(ingredient: any) {
    this.logger.log(`Saving ${ingredient.quantity} ${ingredient.ingredient} ingredient`);
    const ingredientSold = new this.marketModel(ingredient);
    await ingredientSold.save();
  }
}
