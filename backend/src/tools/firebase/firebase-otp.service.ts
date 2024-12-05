import { BadRequestException, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import './firebase-admin.config';

@Injectable()
export class FirebaseOtpSrevice {
  async sendOtp(phoneNumber: string): Promise<string> {
    try {
      try {
        const userExist = await admin.auth().getUserByPhoneNumber(phoneNumber);
        return userExist.uid;
      } catch (error) {
        if (error.errorInfo.code === 'auth/user-not-found') {
          const sessionInfo = await admin.auth().createUser({
            phoneNumber,
          });
          return sessionInfo.uid;
        }
      }
    } catch (error) {
      throw new BadRequestException('Error sending OTP');
    }
  }

  async verifyOtp(otpCode: string, sessionInfo: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(sessionInfo);

      if (!decodedToken) {
        throw new BadRequestException('Invalid OTP');
      }

      return decodedToken;
    } catch (error) {
      throw new BadRequestException('Error verifying OTP', error);
    }
  }
}
