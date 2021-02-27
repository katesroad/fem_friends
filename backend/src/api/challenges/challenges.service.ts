import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ChallengeDoc,
  Challenge,
  Solution,
  SolutionDoc,
  Author,
} from 'common/mongo';
import { SolutionsQueryDto } from './dto/solutions-query.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(Challenge.name)
    private readonly challengeModel: Model<ChallengeDoc>,
    @InjectModel(Solution.name)
    private readonly solutionModel: Model<SolutionDoc>,
  ) {}

  getAllChallenges() {
    return this.challengeModel.find().then((docs) => this.cleanDocs(docs));
  }

  getChallengeByFemId(id: string) {
    return this.challengeModel.findOne({ _id: id }).then((doc) => {
      if (doc) return this.cleanDocs([doc])[0];
      else throw new BadRequestException(`Can't find challegne #${id}`);
    });
  }

  getChallengesSolutions(id: string, queryDto: SolutionsQueryDto) {
    const { offset = 0, limit = 5 } = queryDto;
    return this.solutionModel
      .find({ challenge: id })
      .sort({ updatedAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate({
        path: 'author',
        model: Author.name,
        select: 'username avatar',
      })
      .exec()
      .then((docs) => this.cleanDocs(docs));
  }

  private cleanDocs(docs: any[]) {
    return docs.map((doc) => {
      const { _id, author, ...data } = doc.toJSON();
      if (author) delete author._id;
      return { id: _id, author, ...data };
    });
  }
}
