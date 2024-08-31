import { Injectable } from '@nestjs/common';
import { signupDTO } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/userSchema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(model: signupDTO) {
    const existingUser = await this.userModel.findOne({
      $or: [{ email: model.email }, { name: model.name }],
    });
    if (existingUser) {
      let errorMessage = '';
      if (existingUser.email === model.email) {
        return (errorMessage = 'Duplicate user: Email already exists.');
      } else if (existingUser.name === model.name) {
        return (errorMessage = 'Duplicate user: Name already exists.');
      }
    } else {
      const hashedPassword = await bcrypt.hash(model.password, 10);
      model.password = hashedPassword;

      // Create new user if no duplicates found

      let userCount = await this.userModel.countDocuments();
      model.user_id = 'user_00' + ++userCount;
      const createdUser = new this.userModel(model);
      await createdUser.save();

      return {
        success: true,
        message: 'User was added Successfully',
        name: model.name,
      };
    }
  }

  async getLoggedInUserInfo(email: string) {
    const existingUser = await this.userModel.findOne({
      email: email,
    });
    return existingUser.user_id;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email }).exec();
  }
}
