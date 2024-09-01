import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { configuration } from './configuration';

export const ConfigModuleOptions = ConfigModule.forRoot({
  isGlobal: true,
  cache: true,
  load: [configuration],
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
    SERVER_PORT: Joi.number().default(3000),
    ORDERS_HOST: Joi.string().default('localhost'),
    ORDERS_PORT: Joi.number().default(3001),
    MARKET_HOST: Joi.string().default('localhost'),
    MARKET_PORT: Joi.number().default(3003),
    MONGODB_URI: Joi.string().required(),
  }),
});
