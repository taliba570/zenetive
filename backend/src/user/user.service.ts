import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { EmailService } from '../tools/email/email.service';
import { VerifyEmailTemplateData } from '../tools/email/interfaces/verify-user.interface';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { PasswordService } from './password.service';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly baseURL = process.env.BASE_URL || 'https://localhost:3000/';

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly passwordService: PasswordService,
    private emailService: EmailService,
  ) {}

  protected formatUser(user: User): Partial<User> {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      photoURL: user.photoURL,
    };
  }

  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<Partial<User>> {
    const existingUser = await this.findByEmail(email);

    if (existingUser) throw new BadRequestException('User already exist');

    if (!password) throw new BadRequestException('Passowrd can not be empty');

    const hashedPassword = await this.passwordService.hashPassword(password);
    const verificationToken = randomBytes(32).toString('hex');

    const newUser = new this.userModel({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      verificationToken,
    });

    try {
      await newUser.save();
      if (verificationToken) {
        await this.sendVerificationEmail(newUser);
      }
    } catch (error) {
      this.handleDatabaseError(error);
    }
    return this.formatUser(newUser);
  }

  private handleDatabaseError(error: any): never {
    if (error.code === 11000) {
      throw new ConflictException('User with the given email already exists.');
    }
    throw new InternalServerErrorException(
      'An error occurred while saving the user.',
    );
  }

  private async sendVerificationEmail(user: User): Promise<void> {
    const data: VerifyEmailTemplateData = {
      name: user.name ?? undefined,
      verification_url: this.getVerificationURL(
        user.verificationToken,
        user.email,
      ),
    };
    try {
      await this.emailService.sendMail(
        user.email,
        'Account verification',
        `Hello ${data.name}, Verify your account ${data.verification_url}`,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Unable to send email',
        error.message,
      );
    }
  }

  async verifyToken(token: string, email: string): Promise<boolean> {
    if (!token) throw new BadRequestException('Token is empty');

    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User does not exsit');
    if (!user.verificationToken) {
      throw new BadRequestException('User is already verified.');
    }
    try {
      await this.updateUser(
        { verificationToken: null, isVerified: true },
        user._id.toString(),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Unable to update user status',
        error.message,
      );
    }
    return true;
  }

  async updateUser(fields: UpdateUserDTO, userId: string) {
    const result = await this.userModel
      .updateOne({ _id: userId }, { $set: fields })
      .exec();
    if (result.modifiedCount === 0) {
      throw new BadRequestException('Unable to update the user');
    }
  }

  private getVerificationURL(token: string, email: string) {
    return `${this.baseURL}/auth/verify/${email}/${token}`;
  }

  async createUserWithGithub(profile: any) {
    const user = new User();
    return user;
  }

  async validateGoogleUser(profile: any): Promise<User> {
    const { email, displayName, photos } = profile;

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = new this.userModel({
        name: displayName,
        email,
        photoURL: photos[0].value,
        password: '', // Password not required for social login
        isVerified: true,
        googleLinked: true,
      });
      await user.save();
    } else if (!user.googleLinked) {
      user.googleLinked = true;
      await user.save();
    }

    return user;
  }

  async validateGithubUser(profile: any): Promise<User> {
    const { username, emails, photos } = profile;

    const email = emails[0].value;

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = new this.userModel({
        name: username,
        email,
        photoURL: photos[0].value,
        password: '', // Password not required for social login
        isVerified: true,
        githubLinked: true,
      });
      await user.save();
    } else if (!user.githubLinked) {
      user.githubLinked = true;
      await user.save();
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOne(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId }).exec();
  }

  async setResetPasswordToken(userId: string, token: string, expires: Date) {
    return this.userModel.findByIdAndUpdate(userId, {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    });
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.userModel
      .findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() },
      })
      .exec();

    if (!user) throw new Error('Token expired or invalid');

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    return user.save();
  }

  async updateUserPassword(
    userId: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await this.userModel
      .updateOne({ _id: userId }, { $set: { password: hashedPassword } })
      .exec();

    if (result.modifiedCount === 0) {
      throw new BadRequestException('Unable to update the password');
    }

    return { message: 'Password successfully updated' };
  }
}
