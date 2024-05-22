import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Ingredient } from '../../infrastructure/persistence/schemas';
import { BuyIngredientCommand } from './buy-ingredient.command';

@CommandHandler(BuyIngredientCommand)
export class BuyIngredientHandler implements ICommandHandler<BuyIngredientCommand> {
  constructor(@InjectModel(Ingredient.name) private model: Model<Ingredient>, private config: ConfigService) {}

  async execute(command: BuyIngredientCommand): Promise<void> {
    const marketUrl = new URL(this.config.get('marketUrl'));
    marketUrl.searchParams.set('ingredient', command.ingredient);

    const response = await axios.get(marketUrl.toString());
    const data = response.data;
    return data;
  }
}
