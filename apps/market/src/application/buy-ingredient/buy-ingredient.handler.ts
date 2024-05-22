import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import axios from 'axios';
import { BuyIngredientCommand } from './buy-ingredient.command';
import { BuyIngredientResponse } from './buy-ingredient.response';

@CommandHandler(BuyIngredientCommand)
export class BuyIngredientHandler implements ICommandHandler<BuyIngredientCommand, BuyIngredientResponse> {
  constructor(private config: ConfigService) {}

  async execute(command: BuyIngredientCommand): Promise<BuyIngredientResponse> {
    const marketUrl = new URL(this.config.get('marketUrl'));
    marketUrl.searchParams.set('ingredient', command.ingredient);

    const response = await axios.get(marketUrl.toString());
    const data = response.data;
    return data;
  }
}
