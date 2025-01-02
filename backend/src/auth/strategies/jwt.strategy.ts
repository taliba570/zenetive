import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
      audience: configService.get<string>('jwt.verifyOptions.audience'),
      issuer: configService.get<string>('jwt.verifyOptions.issuer'),
    });
  }

  async validate(payload: any) {
    if (
      payload.iss !== this.configService.get<string>('jwt.verifyOptions.issuer')
    ) {
      throw new UnauthorizedException('Invalid issuer');
    }
    if (
      payload.aud !==
      this.configService.get<string>('jwt.verifyOptions.audience')
    ) {
      throw new UnauthorizedException('Invalid audience');
    }
    return { id: payload.sub, email: payload.email };
  }
}
