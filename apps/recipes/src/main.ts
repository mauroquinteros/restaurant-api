import { NestFactory } from '@nestjs/core';
import { RecipesModule } from './recipes.module';

async function bootstrap() {
  const app = await NestFactory.create(RecipesModule);
  await app.listen(3001);
}
bootstrap();
