/* eslint-disable */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto, CreateAuthDto } from './dto';
import { User } from './auth.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>, private jwtService: JwtService) {

    }
    async singinLocal(dto: AuthDto) {
        return await this.userModel.findOne({ email: dto.email }).exec()
            .then(user => {
                if (!user) {
                    throw new UnauthorizedException('Invalid credentials');
                }
                const isMatch = bcrypt.compare(user.password, dto.password);
                if (!isMatch) {
                    throw new UnauthorizedException('Invalid credentials');
                }
                return this.signUser(user._id, user.email);
            })
            .catch(err => {
                throw new UnauthorizedException('Invalid credentials');
            })
    }

    async singupLocal(dto: CreateAuthDto) {
        const saltOrRounds = 10;

        const user = await this.userModel.findOne({ email: dto.email }).exec();
        if (user) {
            throw new UnauthorizedException('User already exists');
        }
        const password = await bcrypt.hash(dto.password, saltOrRounds);
        const newUser = new this.userModel({
            username: dto.username,
            email: dto.email,
            password,
        })
        return newUser.save()
    }

    signUser(userId: number, email: string, type?: string) {
        return this.jwtService.sign({
            sub: userId,
            email,
            type: type
        })
    }
}
