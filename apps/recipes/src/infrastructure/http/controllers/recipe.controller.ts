import { Body, Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { GetRecipesQuery } from '../../../application/get-recipes';
import { SaveRecipeCommand } from '../../../application/save-recipe';
import { UpdateStockCommand } from '../../../application/update-stock';
import { SaveRecipeDTO, UpdateStockDTO } from '../dtos';

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

  @EventPattern('update_stock')
  async updateRecipeStock(@Body() body: UpdateStockDTO.RequestBody) {
    this.commandBus.execute(new UpdateStockCommand(body.orderId, body.recipes));
  }
}
