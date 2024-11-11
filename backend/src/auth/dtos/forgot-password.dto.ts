import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'taliballauddin@gmail.com',
    description: 'user email',
  })
  email: string;
}

export class ForgotPasswordOtpDto {
  @ApiProperty({
    example: 'taliballauddin@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+923430505458', description: 'User phone number' })
  @IsPhoneNumber(null)
  @IsNotEmpty()
  phoneNumber: string;
}

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  otpCode: string;

  @IsString()
  @IsNotEmpty()
  sessionInfo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
