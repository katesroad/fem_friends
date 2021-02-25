import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class RedisHelperService {
  private redis: any;

  constructor(redisService: RedisService) {
    this.redis = redisService.getClient('fem');
  }

  cacheValue(key: string, value: any): void {
    const redisKey = this.getKey(key);
    this.redis.set(redisKey, JSON.stringify(value), 'EX', 3600); // cache user data for an hour
  }

  getCachedValue(key: string): Promise<any> {
    const redisKey = this.getKey(key);
    return this.redis.get(redisKey);
  }

  private getKey(key: string): string {
    return `fem:${key}`;
  }
}
