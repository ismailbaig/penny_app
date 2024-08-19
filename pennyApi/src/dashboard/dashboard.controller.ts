import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard) // Apply the guard to protect this route
  @Get()
  async getDashboardData() {
    return await this.dashboardService.getDashboardData();
  }
}
