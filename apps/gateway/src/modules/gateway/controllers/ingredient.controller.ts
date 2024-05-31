import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SaveIngredientDTO } from '../dtos';

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
  async saveIngredient(@Body() body: SaveIngredientDTO.RequestBody) {
    const newIngredient = await lastValueFrom(
      this.client.send({ cmd: 'save_ingredient' }, body),
    );
    return newIngredient;
  }
}
