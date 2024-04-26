import { Body, Controller, Post } from '@nestjs/common';
import { SaveRecipe, SaveRecipeCommand } from '../../../application/save-recipe';
import { SaveRecipeDTO } from '../dtos';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly handler: SaveRecipe) {}

  @Post()
  async saveRecipe(@Body() body: SaveRecipeDTO.RequestBody) {
    return this.handler.execute(new SaveRecipeCommand(body.name, body.ingredients));
  }
}
