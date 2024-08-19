import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService as SignupService } from './signup.service';
import { signupDTO } from './signup.dto';

@Controller('api/signup')
export class SignupController {
  constructor(private signupService: SignupService) {}

  @Post('/adduser')
  async createUser(@Body() model: signupDTO) {
    return await this.signupService.createUser(model);
  }
}