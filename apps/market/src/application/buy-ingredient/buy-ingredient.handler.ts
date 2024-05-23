import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import axios from 'axios';
import { BuyIngredientCommand } from './buy-ingredient.command';
import { BuyIngredientResponse } from './buy-ingredient.response';

@CommandHandler(BuyIngredientCommand)
export class BuyIngredientHandler implements ICommandHandler<BuyIngredientCommand, BuyIngredientResponse> {
  private MAX_RETRIES = 10;
  private MARKET_URL: URL;

  constructor(private config: ConfigService) {
    this.MARKET_URL = new URL(this.config.get('marketUrl'));
  }

  async execute(command: BuyIngredientCommand): Promise<BuyIngredientResponse> {
    this.MARKET_URL.searchParams.set('ingredient', command.ingredient);
    const response = await this.fetchIngredient(this.MARKET_URL.toString());
    return response;
  }

  private async fetchIngredient(urlWithIngredient: string): Promise<{ quantitySold: number }> {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let retries = 0;

    while (retries < this.MAX_RETRIES) {
      const response = await axios.get(urlWithIngredient);
      const newIngredient = response.data;

      if (newIngredient.quantitySold > 0) {
        return newIngredient;
      }
      retries++;
      await delay(500);
    }

    throw new Error('Maximum retries exceeded!');
  }
}
