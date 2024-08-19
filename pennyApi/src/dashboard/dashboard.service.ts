import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  constructor() {}

  async getDashboardData() {
    let result = { val: 'Dashboard Data' };
    return result;
  }
}
