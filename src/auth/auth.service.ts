/* eslint-disable */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';



@Injectable()
export class AuthService {
    users = [
        {
            id: 1,
            email: 'user@example.com',
            password: 'password'
        }
    ];
    constructor(private jwtService: JwtService) {

    }
    singinLocal(dto: AuthDto) {
        //retrive user
        const user = this.users.find(u => u.email === dto.email);
        //check if user exists
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        //check if password is correct
        if (user.password !== dto.password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        //return user
        return this.signUser(user.id, user.email, 'user');
    }
    singupLocal(dto: AuthDto) { }

    signUser(userId: number, email: string, type: string) {
        return this.jwtService.sign({
            sub: userId,
            email,
            type: type
        })
    }
}
