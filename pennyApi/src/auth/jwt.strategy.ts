import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'my-key', // Replace with your actual secret key
    });
  }

  async validate(payload: any) {
    // The payload is the decoded JWT token. 
    // Here, you can add custom validation logic if needed.
    return { userId: payload.sub, username: payload.username };
  }
}
