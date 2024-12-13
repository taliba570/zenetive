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
      audience: configService.get<string>('JWT_AUDIENCE'),
      issuer: configService.get<string>('JWT_ISSUER'),
    });
  }

  async validate(payload: any) {
    if (payload.iss !== this.configService.get<string>('JWT_ISSUER')) {
      throw new UnauthorizedException('Invalid issuer');
    }
    if (payload.aud !== this.configService.get<string>('JWT_AUDIENCE')) {
      throw new UnauthorizedException('Invalid audience');
    }
    return { id: payload.sub, email: payload.email };
  }
}
