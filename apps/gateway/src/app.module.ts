import { Module } from '@nestjs/common';
import { ConfigModuleOptions } from './infrastructure/config/config.options';
import { ValidationModule } from './infrastructure/validation/validation.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RecipesModule } from './modules/recipes/recipes.module';

@Module({
  imports: [ConfigModuleOptions, ValidationModule, RecipesModule, OrdersModule],
})
export class AppModule {}
