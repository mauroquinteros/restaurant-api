import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipesService {
  getHello(): string {
    return 'Hello World from recipes app!';
  }
}
