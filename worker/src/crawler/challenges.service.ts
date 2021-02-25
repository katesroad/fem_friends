import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { ChallengeDoc, Challenge } from 'mongo/schemas';
import { Model } from 'mongoose';
import { CrawlerService } from './crawler.service';
import { ErrorService } from './error.service';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(Challenge.name)
    private readonly challengeModel: Model<ChallengeDoc>,
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

  // get the new challenges at 20:30 p.m everyday
  @Cron('0 30 20 * * 1-7')
  handleCronJob() {
    console.log(`Cron job: crawling challenges.`);
    this.crawlChallenges()
      .then((items) => this.cleanChanllenges(items))
      .then((items) =>
        items.map((item) => {
          return this.challengeModel.create(item).catch((e) => {
            const { _id, solutions, ...update } = item;
            return this.challengeModel
              .updateOne({ _id }, update, { upsert: true })
              .catch((e) => {
                this.errorService.logError(
                  { error: e, type: 'save challenge' },
                  true,
                );
              });
          });
        }),
      );
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
