import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRootInfoService(): string {
    return 'I am root service!';
  }

  getApiHealth(): string {
    return "PENNY API (Version 1.0.0) is healthy , up and running!!"
  }

}
