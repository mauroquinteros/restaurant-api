import { Body, Controller, Post } from '@nestjs/common';
import { SaveIngredient, SaveIngredientCommand } from '../../../application/save-ingredient';
import { SaveIngredientDTO } from '../dtos';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly handler: SaveIngredient) {}

  @Post()
  async saveIngredient(@Body() body: SaveIngredientDTO.RequestBody) {
    return this.handler.execute(new SaveIngredientCommand(body.name, body.stock));
  }
}
