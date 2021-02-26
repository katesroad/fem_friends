import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { ChallengeDoc, Challenge, SolutionDoc, Solution } from 'mongo/schemas';
import { Model } from 'mongoose';
import { CrawlerService } from './crawler.service';
import { ErrorService } from './error.service';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(Challenge.name)
    private readonly challengeModel: Model<ChallengeDoc>,
    @InjectModel(Solution.name)
    private readonly solutionModel: Model<SolutionDoc>,
    private readonly crawlerService: CrawlerService,
    private readonly errorService: ErrorService,
  ) {}

  async onApplicationBootstrap() {
    await this.crawlChallenges()
      .then((items) => this.cleanChanllenges(items))
      .then((items) => this.challengeModel.insertMany(items))
      .then(() => console.log(`crawled all the challenges\n`))
      .catch((e) => {
        this.errorService.logError({ type: 'save challenges', error: e });
      });
  }

  @Cron('0 30 16 * * 1-7') // get the new challenges at 16:30 p.m everyday in la time
  cronJobCrawlingChallenges() {
    console.log(`Cron job: crawling challenges.`);
    this.crawlChallenges()
      .then((items) => this.cleanChanllenges(items))
      .then((items) =>
        items.map((item) => {
          const { _id, ...update } = item;
          delete update.solutions;
          return this.challengeModel
            .updateOne({ _id }, update, { upsert: true })
            .catch((e) => {
              this.errorService.logError(
                { error: e, type: 'save challenge' },
                true,
              );
            });
        }),
      )
      .then(() => console.log('Finished Cron job: crawling challenges'));
  }

  @Cron('00 */120 0-24 * * *') //make solutions statistic every 2 hours
  async cronJobStatsChallengesSolutions() {
    console.log(`Cron job: making solution statistic for challenges.`);
    const statsList = await this.solutionModel.aggregate([
      { $group: { _id: '$challenge', solutions: { $sum: 1 } } },
    ]);
    return Promise.all(
      statsList.map((stats) => {
        const { _id, ...update } = stats;
        return this.challengeModel
          .updateOne({ _id }, update, { upsert: true })
          .catch((e) => {
            this.errorService.logError(
              { type: 'stats solution', error: e },
              true,
            );
          });
      }),
    ).then(() => console.log('Finished solution statistic for challenges.'));
  }

  private crawlChallenges() {
    return this.crawlerService
      .getUrlReources('https://backend.frontendmentor.io/rest/challenges')
      .then((items) => this.cleanChanllenges(items));
  }

  private cleanChanllenges(challenges: any[]) {
    return challenges.map((challenge) => {
      const { figmaURL, createdAt, updatedAt, ...data } = challenge;
      return {
        ...data,
        createdAt: new Date(createdAt).getTime(),
        updatedAt: new Date(updatedAt).getTime(),
        crawledAt: Date.now(),
      };
    });
  }
}
