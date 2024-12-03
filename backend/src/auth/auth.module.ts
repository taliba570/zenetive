import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseOtpSrevice } from '../tools/firebase/firebase-otp.service';
import { EmailService } from '../tools/email/email.service';
import * as dotenv from 'dotenv';
import { PasswordService } from '../user/password.service';
import { SocialAuthController } from './social-auth.controller';
import { SocialAuthService } from './social-auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import jwtConfig from 'src/config/jwt.config';

dotenv.config();

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [
    JwtStrategy,
    JwtService,
    AuthService,
    FirebaseOtpSrevice,
    EmailService,
    PasswordService,
    SocialAuthService,
    LocalStrategy
  ],
  controllers: [AuthController, SocialAuthController],
  exports: [],
})
export class AuthModule {}
