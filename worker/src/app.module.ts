import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MongoModule } from 'mongo/mongo.module';
import { CrawlerModule } from 'crawler/crawler.module';
import config from 'config';

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
    CrawlerModule,
  ],
})
export class AppModule {}
