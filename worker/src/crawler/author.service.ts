import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Author, AuthorDoc, UserStatsDoc, UsersStats } from 'mongo/schemas';
import { Model } from 'mongoose';
import { CrawlerService } from './crawler.service';
import { ErrorService } from './error.service';
import { RedisHelperService } from './redis-helper.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name)
    private readonly authorModel: Model<AuthorDoc>,
    @InjectModel(UsersStats.name)
    private readonly usersStatsModel: Model<UserStatsDoc>,
    private readonly crawlerService: CrawlerService,
    private readonly errorService: ErrorService,
    private readonly redisService: RedisHelperService,
  ) {}

  /**
   * store crawled user's information to MongoDB
   * @param{string} usernae the username
   */
  async trackUser(username: string) {
    const user = await this.redisService.getCachedValue(username);
    if (user) return; //the user info has been crawled
    const url = `https://backend.frontendmentor.io/rest/users/${username}`;
    this.crawlerService
      .getUrlReources(url)
      .then((data) => {
        if (!data) return null;
        const {
          _id,
          links = {},
          username,
          avatar,
          hasActiveSubscription,
          name,
          createdAt,
          updatedAt,
          location,
        } = data;
        const update = {
          name,
          username,
          avatar,
          github: links.gitHub?.trim(),
          proUser: hasActiveSubscription,
          createdAt: new Date(createdAt).getTime(),
          updatedAt: new Date(updatedAt).getTime(),
          location,
        };
        return this.authorModel
          .updateOne({ _id }, update, { upsert: true })
          .then(() => {
            return this.redisService.cacheValue('author', username);
          });
      })
      .catch((e) =>
        this.errorService.logError({ type: 'track user', error: e, url }, true),
      );
  }

   @Cron('0 30 16 * * 1-7')// get the new challenges at 16:30 p.m everyday in la time
  statsUsers() {
    const statsList = this.authorModel
      .aggregate([{ $match: { proUser: true } }, { $count: 'total' }])
      .then((docs) => docs[0]?.total);
    const totalUsers = this.authorModel
      .aggregate([{ $count: 'totalUser' }])
      .then((docs) => docs[0]?.totalUser);
    Promise.all([statsList, totalUsers]).then((data) => {
      const [paidUsers, totalUsers] = data;
      const statsAt = Date.now();
      const stats = { paidUsers, totalUsers, statsAt };
      return this.usersStatsModel
        .create({ paidUsers, totalUsers, statsAt })
        .catch((e) => this.errorService.logError({ type: 'stats', error: e }));
    });
  }
}
