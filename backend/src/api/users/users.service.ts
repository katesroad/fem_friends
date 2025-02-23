import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Solution, SolutionDoc, UserStatsDoc } from 'common/mongo';
import { UsersStats } from 'common/mongo';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Solution.name)
    private readonly solutionModel: Model<SolutionDoc>,
    @InjectModel(UsersStats.name)
    private readonly userStatsModel: Model<UserStatsDoc>,
  ) {}

  getUsersStats() {
    return this.userStatsModel.find();
  }

  getUsersSolutions(id: string) {
    return this.solutionModel.find({ author: id }).then((docs) =>
      docs.map((doc) => {
        const { _id, ...data } = doc.toJSON();
        return { id: _id, ...data };
      }),
    );
  }
}
