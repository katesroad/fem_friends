import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Interval } from '@nestjs/schedule';
import { Solution, SolutionDoc } from 'mongo/schemas';
import { Model } from 'mongoose';
import { AuthorService } from './author.service';
import { CrawlerService } from './crawler.service';
import { ErrorService } from './error.service';
import { HelperService } from './helper.service';
import { RedisHelperService } from './redis-helper.service';

@Injectable()
export class SolutionsService {
  private readonly limit = 23;
  private isInitialized = false;
  private prevCrawlingRange: { lastTimestamp: number; firstTimestamp: number };
  private keepGoing = true;

  constructor(
    @InjectModel(Solution.name)
    private readonly solutionModel: Model<SolutionDoc>,
    private readonly crawlerService: CrawlerService,
    private readonly authorService: AuthorService,
    private readonly errorService: ErrorService,
    private readonly helperService: HelperService,
    private readonly redisService: RedisHelperService,
    private readonly configService: ConfigService,
  ) {
    this.keepGoing = this.configService.get('cron.solution.keepGoing');
  }

  async onApplicationBootstrap() {
    await this.getPrevCrawlingRange(); // to get the previous crawling range
    const startAt = Date.now();
    const limit = this.limit;
    let params = { limit, offset: limit };
    while (this.keepGoing) {
      if (!this.isInitialized) {
        // crawling the latest ${limit} records before having crawled all the data
        console.log(`crawling the latest ${limit} records...`);
        await this.crawlSolutions({ limit, offset: 0 });
      }
      // after crawling the latest ${limit} records, crawling the remaining data
      console.log(`Crawling offset:${params.offset}, limit:${params.limit}`);
      params = await this.crawlSolutions(params);
      const sleepingTime = Math.ceil(Math.random() * 20000); // Avoid cloudflare service rejection
      await this.helperService.sleep(sleepingTime);
      if (!this.keepGoing) {
        const timeCost = Date.now() - startAt;
        console.log(`\n Finished crawling solutions ${timeCost}\n`);
        this.isInitialized = true;
        break;
      }
    }
  }

  // fetching the latest solutions every 6 minutes
  @Interval(360000)
  private async handleCronCrawlingSolutions() {
    if (this.isInitialized) {
      const params = { offset: 0, limit: this.limit, keepGoing: false };
      console.log(`crawling latest ${this.limit} solutions every 6 minutes`);
      await this.crawlSolutions(params);
    }
  }

  private async crawlSolutions(params: { offset: number; limit: number }) {
    const { offset, limit } = params;
    return this.crawlerService
      .getUrlReources(
        `https://backend.frontendmentor.io/rest/solutions`,
        params,
      )
      .then((solutions) => {
        // error happened at crawler when crawling solutions
        if (!solutions) return params;
        if (solutions.length === 0) {
          //has reached the last page
          this.keepGoing = false;
          return params;
        }
        return Promise.all(
          solutions.map((solution) => this.trackSolution(solution)),
        ).then(() => ({
          offset: limit + offset,
          limit,
        }));
      });
  }

  private async trackSolution(solution: any) {
    const { user, slug } = solution;
    const updatedAt = new Date(solution.updatedAt).getTime();
    // the trange has been tracked
    if (
      updatedAt > this.prevCrawlingRange.firstTimestamp &&
      updatedAt < this.prevCrawlingRange.lastTimestamp
    ) {
      return;
    }
    this.authorService.trackUser(user?.username); // the username points to user's page
    return this.trackSolutionInfo(slug); //the slug points to solution page
  }

  private async trackSolutionInfo(solutionSlug: string) {
    const hasBeenCrawled = await this.redisService.getCachedValue(solutionSlug);
    if (!!hasBeenCrawled) return;

    const solutionUrl = `https://backend.frontendmentor.io/rest/solutions/${solutionSlug}`;
    return this.crawlerService
      .getUrlReources(solutionUrl)
      .then((solution) => {
        const challenge = solution.challenge?._id;
        const author = solution.user?._id;
        const {
          _id,
          liveURL,
          repoURL,
          submittedAt,
          title,
          slug,
          screenshot,
          createdAt,
          updatedAt,
        } = solution;
        const update = {
          challenge,
          author,
          slug, //direct to solution page at fem
          title, // the solution title provided by user
          liveURL,
          repoURL,
          screenshot,
          createdAt: new Date(createdAt).getTime(),
          updatedAt: new Date(updatedAt).getTime(),
          submittedAt: new Date(submittedAt).getTime(),
        };
        return this.solutionModel
          .updateOne({ _id }, update, { upsert: true })
          .then(() => this.redisService.cacheValue(solutionSlug, solutionSlug));
      })
      .catch((e) => {
        return this.errorService.logError(
          {
            type: 'create solution',
            url: solutionSlug,
            error: e,
          },
          true,
        );
      });
  }

  // Track the previous crawling record in MongoDB
  private getPrevCrawlingRange() {
    const latest = this.solutionModel
      .aggregate([
        { $sort: { updatedAt: -1 } },
        { $project: { updatedAt: 1 } },
        { $limit: 1 },
      ])
      .then((records) => records[0]?.updatedAt);
    const oldest = this.solutionModel
      .aggregate([
        { $sort: { updatedAt: 1 } },
        { $project: { updatedAt: 1 } },
        { $limit: 1 },
      ])
      .then((records) => records[0]?.updatedAt);
    return Promise.all([latest, oldest])
      .then((data) => {
        const [latest, oldest] = data;
        const TEN_MINUTES = 10 * 60 * 1000;
        // to avoid solutions lost, narrow the range for 20 minutes
        this.prevCrawlingRange = {
          lastTimestamp: latest - TEN_MINUTES,
          firstTimestamp: oldest + TEN_MINUTES,
        };
      })
      .catch((e) => {
        this.prevCrawlingRange = { lastTimestamp: -1, firstTimestamp: -1 };
      });
  }
}
