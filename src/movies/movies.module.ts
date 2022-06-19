/* eslint-disable */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './movie.model';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])],
    controllers: [MoviesController],
    providers: [MoviesService],
})
export class MoviesModule { }