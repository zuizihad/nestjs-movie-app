/* eslint-disable */

import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addUser(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('createdAt') createdAt: Date,
        @Body('updatedAt') updatedAt: Date,
    ) {
        const generatedId = await this.userService.insertUser(
            name,
            email,
            password,
            createdAt,
            updatedAt,
        );
        return { id: generatedId };
    }
}