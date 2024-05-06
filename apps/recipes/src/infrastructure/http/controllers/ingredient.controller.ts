import { Body, Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { GetIngredientsQuery } from '../../../application/get-ingredients';
import { SaveIngredientCommand } from '../../../application/save-ingredient';
import { SaveIngredientDTO } from '../dtos';

@Controller()
export class IngredientController {
  constructor(protected readonly commandBus: CommandBus, protected readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: 'get_ingredients' })
  async getIngredients() {
    return this.queryBus.execute(new GetIngredientsQuery());
  }

  @MessagePattern({ cmd: 'save_ingredient' })
  async saveIngredient(@Body() body: SaveIngredientDTO.RequestBody) {
    return this.commandBus.execute(new SaveIngredientCommand(body.name, body.stock));
  }
}
