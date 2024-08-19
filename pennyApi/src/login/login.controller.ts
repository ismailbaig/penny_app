import { Body, Controller, Get, Param, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './login.dto';
import { LoginService } from './login.service';

@Controller('api/login')
export class LoginController {
  constructor(private loginSrv: LoginService) {}

  @Post('tkn')
  async login(@Body() loginDto:  LoginDTO) {
    try {
      return await this.loginSrv.login(loginDto.email, loginDto.pd);
    } catch (error) {
      throw new UnauthorizedException('Login failed: ' + error.message);
    }
  }
}