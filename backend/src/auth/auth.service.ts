import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { FirebaseOtpSrevice } from './../tools/firebase/firebase-otp.service';
import { EmailService } from '../tools/email/email.service';
import * as dotenv from 'dotenv';
import { SignInData } from './dtos/user.dto';
import { PasswordService } from 'src/user/password.service';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private firebaseOtpService: FirebaseOtpSrevice,
    private emailService: EmailService,
    private passwordService: PasswordService,
  ) {}
  private readonly port = process.env.PORT || 3000;
  private readonly baseURL = process.env.BASE_URL || `http://localhost:${this.port}`;

  async validateUser(email: string, password: string): Promise<SignInData> {
    const user = await this.userService.findByEmail( email);
    
    if (!user) throw new NotFoundException('User not found');

    if (await this.passwordService.comparePassword(password, user.password)) {
      return {
        id: user.id,
        email: user.email,
      };
    } else {
      throw new BadRequestException('Invalid credentials')
    }
  }

  async signIn(user: SignInData) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return {
      accessToken,
      user: {
        userId: user.id,
        email: user.email,
      },
    };
  }

  async setResetPasswordToken(userId: string) {
    const token = Math.random().toString(36).substr(2);
    const expirationDate = new Date(Date.now() + 3600 * 1000);
    const user = await this.userService.findOne(userId);
    
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    if (user.verificationToken) {
      throw new BadRequestException('User not activated yet');
    }

    await this.userService.setResetPasswordToken(userId, token, expirationDate);

    await this.sendResetPasswordEmail(user.email, token)

    return {
      message: 'Password reset link has been sent to your email.',
      temp: {
        token,
        expirationDate,
      },
    };
  }

  async forgotPasswordWithOtp(email: string, phoneNumber: string) {
    const user = await this.userService.findByEmail( email);
    console.log(user);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const sessionInfo = await this.firebaseOtpService.sendOtp(phoneNumber);

    return {
      message: 'OTP sent to your phone number',
      sessionInfo,
    };
  }

  async verifyOtpAndResetPassword(
    otpCode: string,
    sessionInfo: string,
    newPassword: string,
  ) {
    const decodedToken = await this.firebaseOtpService.verifyOtp(
      otpCode,
      sessionInfo,
    );

    if (decodedToken) {
      return this.userService.updateUserPassword(decodedToken.uid, newPassword);
    }

    throw new BadRequestException('OTP verification failed');
  }

  async refreshToken(refreshToken: string) {

  }

  async sendResetPasswordEmail(email: string, resetToken: string) {
    const resetLink = `${this.baseURL}/reset-password/${email}/${resetToken}`;

    const emailContent = `
      <p>You requested to reset your password.</p>
      <p>Click on the following link to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    return await this.emailService.sendMail(
      email,
      'Password Reset Request',
      emailContent,
    );
  }
}
