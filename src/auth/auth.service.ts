import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { SignInData } from "./dtos/signin-data.dto";
import * as bcrypt from 'bcrypt';
import { FirebaseOtpSrevice } from "./../tools/firebase/firebase-otp.service";
import { EmailService } from "../tools/email/email.service";
import * as dotenv from 'dotenv';

dotenv.config(); 

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private firebaseOtpService: FirebaseOtpSrevice,
    private emailService: EmailService,
  ) {}

  async authenticate(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if(!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return await this.signIn(user);
  }

  async validateUser(email: string, password: string): Promise<SignInData> {
    const user = await this.userService.findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return {
        id: user.id,
        email: user.email
      };
    }
    return null;
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
        email: user.email
      }
    }
  }

  async setResetPasswordToken(userId: string) {
    const token = Math.random().toString(36).substr(2);
    const expirationDate = new Date(Date.now() + 3600 * 1000);

    await this.userService.setResetPasswordToken(userId, token, expirationDate);

    return { 
      message: 'Password reset link has been sent to your email.', 
      temp: {
        token,
        expirationDate
      }
    };
  }

  async forgotPasswordWithOtp(email: string, phoneNumber: string) {
    const user = await this.userService.findUserByEmail(email);
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
    newPassword: string
  ) {
    const decodedToken = await this.firebaseOtpService.verifyOtp(otpCode, sessionInfo);

    if (decodedToken) {
      return this.userService.updateUserPassword(decodedToken.uid, newPassword);
    }

    throw new BadRequestException('OTP verification failed');
  }

  async sendResetPasswordEmail(email: string, resetToken: string) {
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    const emailContent = `
      <p>You requested to reset your password.</p>
      <p>Click on the following link to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    return await this.emailService.sendMail(email, 'Password Reset Request', emailContent);
  }
}