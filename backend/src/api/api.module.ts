import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from 'common/middlewares';
import { ChallengesModule } from './challenges/challenges.module';
import { SolutionsModule } from './solutions/solutions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ChallengesModule, SolutionsModule, UsersModule],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/v1');
  }
}
