import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { EmailService } from '../tools/email/email.service';
import { FirebaseOtpSrevice } from '../tools/firebase/firebase-otp.service';
import { PasswordService } from '../user/password.service';
import { UserModule } from '../user/user.module';
import jwtConfig from './../config/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SocialAuthController } from './social-auth.controller';
import { SocialAuthService } from './social-auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    JwtModule.registerAsync(refreshJwtConfig.asProvider()),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  providers: [
    AuthService,
    FirebaseOtpSrevice,
    EmailService,
    PasswordService,
    SocialAuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  controllers: [AuthController, SocialAuthController],
  exports: [],
})
export class AuthModule {}
