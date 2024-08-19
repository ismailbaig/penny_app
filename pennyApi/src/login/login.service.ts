import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../signup/signup.service';
@Injectable()
export class LoginService {
constructor(private jwtService:JwtService,
  private userService: UsersService
) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && pass === user.password) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(email: string, pd: string) {
    const user = await this.validateUser(email, pd);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload), 
      username: user.name,
      user_id: user.user_id,
      email:user.email
    };
  }

}
