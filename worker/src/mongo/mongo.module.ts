import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Solution, SolutionSchema } from './schemas/solutions.schema';
import { Author, AuthorSchema } from './schemas/author.schema';
import { Challenge, ChallengeSchema } from './schemas/challenges.schema';
import { CrawlerError, CrawlerErrorSchema } from './schemas/error.schema';
import { UserstatsSchema, UsersStats } from './schemas/UserStats.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Solution.name, schema: SolutionSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Challenge.name, schema: ChallengeSchema },
      { name: CrawlerError.name, schema: CrawlerErrorSchema },
      { name: UsersStats.name, schema: UserstatsSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Solution.name, schema: SolutionSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Challenge.name, schema: ChallengeSchema },
      { name: CrawlerError.name, schema: CrawlerErrorSchema },
      { name: UsersStats.name, schema: UserstatsSchema },
    ]),
  ],
})
export class MongoModule {}
