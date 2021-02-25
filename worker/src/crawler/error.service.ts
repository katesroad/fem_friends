import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CrawlerError, CrawlerErrorDoc } from 'mongo/schemas';
import { Model } from 'mongoose';

export interface IErrorInfo {
  type: string;
  error: unknown;
  url?: string;
  data?: Record<string, string>;
}

@Injectable()
export class ErrorService {
  private logger = new Logger('ErrorService');
  constructor(
    @InjectModel(CrawlerError.name)
    private readonly errorModel: Model<CrawlerErrorDoc>,
  ) {}

  /**
   * Track error
   * @param{IErrorInfo} errorInfo the error information
   * @param{boolean}  useLog log error information to terminal?
   */
  logError(errorInfo: IErrorInfo, useLog?: boolean) {
    const { data, error, ...rest } = errorInfo;
    if (useLog) {
      this.logger.log(`Error:`);
      this.logger.log(error);
      this.logger.log(`\n`);
    }
    return this.errorModel.create({
      ...rest,
      error: JSON.stringify(error),
      data: JSON.stringify(data),
    });
  }
}
