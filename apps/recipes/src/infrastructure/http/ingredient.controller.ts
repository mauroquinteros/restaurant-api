import { Controller, Post } from '@nestjs/common';
import { SaveIngredient } from '../../application/save-ingredient';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly saveIngredient: SaveIngredient) {}

  @Post()
  createIngredient() {
    return this.saveIngredient.execute();
  }
}
