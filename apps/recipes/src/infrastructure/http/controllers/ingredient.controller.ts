import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetIngredientsQuery } from '../../../application/get-ingredients';
import { SaveIngredientCommand } from '../../../application/save-ingredient';
import { SaveIngredientDTO } from '../dtos';

@Controller('ingredients')
export class IngredientController {
  constructor(protected readonly commandBus: CommandBus, protected readonly queryBus: QueryBus) {}

  @Get()
  async getIngredients() {
    return this.queryBus.execute(new GetIngredientsQuery());
  }

  @Post()
  async saveIngredient(@Body() body: SaveIngredientDTO.RequestBody) {
    return this.commandBus.execute(new SaveIngredientCommand(body.name, body.stock));
  }
}
