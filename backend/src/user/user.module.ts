import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../tools/email/email.service';
import { PasswordService } from './password.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, JwtService, EmailService, PasswordService],
})
export class UserModule {}
