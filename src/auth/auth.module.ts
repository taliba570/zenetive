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

dotenv.config();

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  providers: [JwtStrategy, JwtService, AuthService, FirebaseOtpSrevice, EmailService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
