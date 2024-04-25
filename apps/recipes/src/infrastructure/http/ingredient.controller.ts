import { Body, Controller, Post } from '@nestjs/common';
import { SaveIngredient, SaveIngredientCommand } from '../../application/save-ingredient';
import { SaveIngredientDTO } from './dtos';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly saveIngredient: SaveIngredient) {}

  @Post()
  async createIngredient(@Body() body: SaveIngredientDTO.RequestBody) {
    return this.saveIngredient.execute(new SaveIngredientCommand(body.name, body.stock));
  }
}
