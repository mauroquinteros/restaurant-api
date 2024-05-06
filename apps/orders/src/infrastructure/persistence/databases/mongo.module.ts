import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const MongoModule = MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    uri: config.get('database.uri'),
  }),
});
