import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    });
  }
}
