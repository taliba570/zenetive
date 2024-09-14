import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { SignInData } from "./dtos/signin-data.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
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
      secret: '123123123',
      expiresIn: '1hr',
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
}