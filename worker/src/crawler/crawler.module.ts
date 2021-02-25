import { HttpModule, Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongoModule } from 'mongo/mongo.module';
import { CrawlerService } from './crawler.service';
import { ChallengesService } from './challenges.service';
import { SolutionsService } from './solutions.service';
import { AuthorService } from './author.service';
import { ErrorService } from './error.service';
import { HelperService } from './helper.service';
import { RedisHelperService } from './redis-helper.service';

@Module({
  imports: [
    MongoModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('redis'),
    }),
    HttpModule.register({}),
    ScheduleModule.forRoot(),
  ],
  providers: [
    CrawlerService,
    ChallengesService,
    SolutionsService,
    AuthorService,
    ErrorService,
    HelperService,
    RedisHelperService,
  ],
})
export class CrawlerModule {}
