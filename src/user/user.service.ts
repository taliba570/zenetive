import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createUser(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ name, email: email.toLowerCase(), password: hashedPassword });
    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async setResetPasswordToken(userId: string, token: string, expires: Date) {
    return this.userModel.findByIdAndUpdate(userId, {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    });
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    }).exec();

    if (!user) throw new Error('Token expired or invalid');
    
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    return user.save();
  }

  async updateUserPassword(userId: string, newPassword: string): Promise<{ message: string }> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await this.userModel.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } },
    ).exec();

    if (result.modifiedCount === 0) {
      throw new BadRequestException('Unable to update the password');
    }

    return { message: 'Password successfully updated' };
  }
}
