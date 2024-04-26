import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SaveIngredientCommand } from '../../../application/save-ingredient';
import { SaveIngredientDTO } from '../dtos';

@Controller('ingredients')
export class IngredientController {
  constructor(protected readonly commandBus: CommandBus, protected readonly queryBus: QueryBus) {}

  @Post()
  async saveIngredient(@Body() body: SaveIngredientDTO.RequestBody) {
    return this.commandBus.execute(new SaveIngredientCommand(body.name, body.stock));
  }
}
