import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetRecipesQuery } from '../../../application/get-recipes';
import { SaveRecipeCommand } from '../../../application/save-recipe';
import { SaveRecipeDTO } from '../dtos';

@Controller('recipes')
export class RecipeController {
  constructor(protected readonly commandBus: CommandBus, protected readonly queryBus: QueryBus) {}

  @Get()
  async getRecipes() {
    return this.queryBus.execute(new GetRecipesQuery());
  }

  @Post()
  async saveRecipe(@Body() body: SaveRecipeDTO.RequestBody) {
    return this.commandBus.execute(new SaveRecipeCommand(body.name, body.ingredients));
  }
}
