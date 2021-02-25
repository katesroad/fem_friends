import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDoc } from 'mongo/schemas';
import { Model } from 'mongoose';
import { CrawlerService } from './crawler.service';
import { ErrorService } from './error.service';
import { RedisHelperService } from './redis-helper.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name)
    private readonly authorModel: Model<AuthorDoc>,
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
}
