import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

describe('RecipesController', () => {
  let recipesController: RecipesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [RecipesService],
    }).compile();

    recipesController = app.get<RecipesController>(RecipesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(recipesController.getHello()).toBe('Hello World!');
    });
  });
});
