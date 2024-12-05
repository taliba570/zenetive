import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from 'src/user/password.service';
import { EmailService } from '../tools/email/email.service';
import { UserService } from '../user/user.service';
import { FirebaseOtpSrevice } from './../tools/firebase/firebase-otp.service';
import { SignInData } from './dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
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

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }

    const isMatched = await this.passwordService.validatehashedString(refreshToken, user.hashedRefreshToken);
    if (!isMatched) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
    return {
      id: user.id,
      email: user.email
    }
  }

  async signIn(user: SignInData) {
    const { accessToken, refreshToken } = await this.passwordService.generateToken(user);
    const hashedRefreshToken = await this.passwordService.hashString(refreshToken);
    await this.userService.updateHashedRefreshToken(user.id, hashedRefreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
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

  async signOut(userId: string) {
    const result = await this.userService.updateHashedRefreshToken(userId, null);
    if (result.modifiedCount > 0) {
      return true;
    }
    return false;
  }
}
