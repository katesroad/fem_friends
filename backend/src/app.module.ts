import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { MongoModule } from 'mongo/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const mongoConf = config.get('db.Mongo');
        return {
          ...mongoConf,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),
    MongoModule,
    ApiModule,
  ],
})
export class AppModule {}
