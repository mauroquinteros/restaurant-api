import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SaveIngredientRequestBody } from '../dtos/save-ingredient.request.dto';

@Controller('ingredients')
export class IngredientController {
  constructor(@Inject('RECIPES_SERVICE') private client: ClientProxy) {}

  @Get()
  async getIngredients() {
    const ingredients = await lastValueFrom(
      this.client.send({ cmd: 'get_ingredients' }, {}),
    );
    return ingredients;
  }

  @Post()
  async saveIngredient(@Body() body: SaveIngredientRequestBody) {
    const newIngredient = await lastValueFrom(
      this.client.send({ cmd: 'save_ingredient' }, body),
    );
    return newIngredient;
  }
}
