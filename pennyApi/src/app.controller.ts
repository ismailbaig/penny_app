import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './signup/signup.service';

@Controller()

export class AppController {
  constructor(private readonly appService: AppService,
    private readonly userService:UsersService
  ) {}

  //root base service or url
  @Get('/')
  getRootInfo(): string {
    return this.appService.getRootInfoService();
  }

  @UseGuards(JwtAuthGuard) // Apply the guard to protect this route
  @Get('/healthcheck')
  getAPIHealthCheck(): string {
    return this.appService.getApiHealth();
  }

  @UseGuards(JwtAuthGuard) // Apply the guard to protect this route
  @Get()
  getProfile() {
    return { message: 'This is a protected route' };
  }

}
