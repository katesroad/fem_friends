import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Solution, SolutionSchema } from './schemas/solutions.schema';
import { Author, AuthorSchema } from './schemas/author.schema';
import { Challenge, ChallengeSchema } from './schemas/challenges.schema';
import { ConfigService } from '@nestjs/config';
import { UsersStats, UserstatsSchema } from './schemas/user.schema';

@Module({
  imports: [
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
    MongooseModule.forFeature([
      { name: Solution.name, schema: SolutionSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Challenge.name, schema: ChallengeSchema },
      { name: UsersStats.name, schema: UserstatsSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Solution.name, schema: SolutionSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Challenge.name, schema: ChallengeSchema },
      { name: UsersStats.name, schema: UserstatsSchema },
    ]),
  ],
})
export class MongoModule {}
