import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Solution, SolutionDoc } from 'mongo/schemas';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectModel(Solution.name)
    private readonly solutionModel: Model<SolutionDoc>,
  ) {}

  async rateSolution(id: string, rate: any) {
    const solution = await this.solutionModel.findOne(
      { _id: id },
      { like: 1, dislike: 1 },
    );
    if (!solution) {
      throw new BadRequestException(` soltion #${id} does not exist`);
    }
    const { like, dislike } = solution;
    return this.solutionModel.updateOne(
      { _id: id },
      {
        like: like + (rate.like || 0),
        dislike: dislike + (rate.dislile || 0),
      },
    );
  }
}
