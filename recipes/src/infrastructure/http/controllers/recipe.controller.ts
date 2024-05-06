import { Body, Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { GetRecipesQuery } from '../../../application/get-recipes';
import { SaveRecipeCommand } from '../../../application/save-recipe';
import { SaveRecipeDTO } from '../dtos';

@Controller()
export class RecipeController {
  constructor(protected readonly commandBus: CommandBus, protected readonly queryBus: QueryBus) {}

  @MessagePattern({ cmd: 'get_recipes' })
  async getRecipes() {
    return this.queryBus.execute(new GetRecipesQuery());
  }

  @MessagePattern({ cmd: 'save_recipe' })
  async saveRecipe(@Body() body: SaveRecipeDTO.RequestBody) {
    return this.commandBus.execute(new SaveRecipeCommand(body.name, body.ingredients));
  }
}
