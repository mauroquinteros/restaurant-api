import { Body, Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { BuyIngredientCommand } from '../../application/buy-ingredient';
import { BuyIngredientRequestBody } from '../dtos/buy-ingredient.request.dto';

@Controller()
export class MarketController {
  constructor(protected readonly commandBus: CommandBus, protected readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: 'buy_ingredient' })
  async buyIngredient(@Body() body: BuyIngredientRequestBody) {
    return this.commandBus.execute(new BuyIngredientCommand(body.ingredient));
  }
}
