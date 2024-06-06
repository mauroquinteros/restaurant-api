import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SaveRecipeRequestBody } from '../dtos/save-recipe.request.dto';

@Controller('recipes')
export class RecipeController {
  constructor(@Inject('RECIPES_SERVICE') private client: ClientProxy) {}

  @Get()
  async getRecipes() {
    const recipes = await lastValueFrom(
      this.client.send({ cmd: 'get_recipes' }, {}),
    );
    return recipes;
  }

  @Post()
  async saveRecipe(@Body() body: SaveRecipeRequestBody) {
    const newRecipe = await lastValueFrom(
      this.client.send({ cmd: 'save_recipe' }, body),
    );
    return newRecipe;
  }
}
