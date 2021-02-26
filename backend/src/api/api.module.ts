import { Module } from '@nestjs/common';
import { ChallengesModule } from './challenges/challenges.module';
import { SolutionsModule } from './solutions/solutions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ChallengesModule, SolutionsModule, UsersModule],
})
export class ApiModule {}
