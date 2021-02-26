import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Solution, SolutionSchema } from './schemas/solutions.schema';
import { Author, AuthorSchema } from './schemas/author.schema';
import { Challenge, ChallengeSchema } from './schemas/challenges.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Solution.name, schema: SolutionSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Challenge.name, schema: ChallengeSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Solution.name, schema: SolutionSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Challenge.name, schema: ChallengeSchema },
    ]),
  ],
})
export class MongoModule {}
