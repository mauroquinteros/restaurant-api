import { Controller, Get } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller()
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  getHello(): string {
    return this.recipesService.getHello();
  }
}
