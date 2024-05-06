import { Module } from '@nestjs/common';
import { ConfigModuleOptions } from './infrastructure/config/config.options';
import { RecipesModule } from './modules/recipes/recipes.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ValidationModule } from './infrastructure/validation/validation.module';

@Module({
  imports: [ConfigModuleOptions, ValidationModule, RecipesModule, OrdersModule],
})
export class AppModule {}
