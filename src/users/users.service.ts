/* eslint-disable */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async insertUser(
        name: string,
        email: string,
        password: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        const newUser = new this.userModel({ name, email, password, createdAt, updatedAt });
        const result = await newUser.save();
        console.log(result);
        return result.id as string;
    }
}