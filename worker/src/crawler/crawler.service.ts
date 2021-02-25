import { HttpService, Injectable } from '@nestjs/common';
import { ErrorService } from './error.service';
import { HelperService } from './helper.service';

@Injectable()
export class CrawlerService {
  private retries: { [key: string]: number } = {};
  constructor(
    private readonly httpService: HttpService,
    private readonly errorService: ErrorService,
    private readonly helperService: HelperService,
  ) {}

  getUrlReources(url: string, params?: Record<string, string | number>) {
    return this.httpService
      .get(url, { params })
      .toPromise()
      .then((res) => delete this.retries[url] && res.data)
      .catch(async (e) => {
        this.retries[url] ? (this.retries[url] += 1) : (this.retries[url] = 1);
        await this.errorService.logError({ type: 'crawler', error: e, url });
        if (this.retries[url] > 4) return null;
        else {
          await this.helperService.sleep(1500);
          return this.getUrlReources(url, params);
        }
      });
  }
}
