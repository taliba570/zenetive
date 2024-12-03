import { ApiProperty } from "@nestjs/swagger";
import { 
    IsEmail, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsString, 
    MinLength 
} from "class-validator";

export class SignInData {
    id: string;
    email: string;
  }
  
export class LoginUserDto {
    @ApiProperty({
        example: 'taliballauddin@gmail.com',
        description: 'user email',
    })
    email: string;

    @ApiProperty({ 
        example: '123123123', 
        description: 'user password'
    })
    password: string;
    }

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

    @ApiProperty({ 
        example: '+923430505458', 
        description: 'User phone number'
    })
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

export class CreateUserDto {
    @ApiProperty({ 
        example: 'Talib Allauddin', 
        description: 'user full name'
    })
    name: string;

    @ApiProperty({
        example: 'taliballauddin@gmail.com',
        description: 'user email',
    })
    email: string;

    @ApiProperty({ 
        example: '123123123', 
        description: 'user password' 
    })
    password: string;
}

export class CreateLinkedUserDto {
    @ApiProperty({ 
        example: 'Talib Allauddin', 
        description: 'user full name' 
    })
    name: string;

    @ApiProperty({
        example: 'taliballauddin@gmail.com',
        description: 'user email',
    })
    email: string;

    @ApiProperty({
        example: 'https://zeeshan-images.s3.eu-north-1.amazonaws.com/favicon2.png',
        description: 'user photo URL',
    })
    photoURL?: string;

    @ApiProperty({
        example: '+923430505458',
        description: 'user phone number',
    })
    phone?: string;

    @ApiProperty({
        example: 'false',
        description: 'if user is verified',
    })
    isVerified: boolean;
}

export class RefreshTokenDto {
    @ApiProperty({
        example: 'fj20fj23fjoi',
        description: 'refresh token',
    })
    refreshToken: string;
}

export class ChangePasswordDto {

}

export class SendVerificationEmailDto {

}