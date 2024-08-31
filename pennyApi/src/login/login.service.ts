import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../signup/signup.service';
import { UserDTO } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async validateUser(email: string, pass: string): Promise<UserDTO> {
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user.toObject();
        return result;
      }
    }
    return null;
  }

  async login(email: string, pd: string) {
    const user = await this.validateUser(email, pd);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.name, sub: user.user_id };
    const expiresIn = 60;
    const accessToken = this.jwtService.sign(payload, { expiresIn });
    return {
      access_token: accessToken,
      username: user.name,
      user_id: user.user_id,
      email: user.email,
      expires_in: expiresIn,
    };
  }
}
