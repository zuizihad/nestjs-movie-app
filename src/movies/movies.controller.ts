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

import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addMovie(
        @Body('title') title: string,
        @Body('released') released: string,
        @Body('director') director: string,
        @Body('imdbVotes') imdbVotes: string,
        @Body('moviePlot') moviePlot: string,
        @Body('personName') personName: Array<string>,
        @Body('genre') genre: string,
        @Body('country') country: string,
        @Body('language') language: string,
        @Body('rating') rating: string,
    ) {
        const generatedId = await this.moviesService.insertMovie(
            title,
            released,
            director,
            imdbVotes,
            moviePlot,
            personName,
            genre,
            country,
            language,
            rating,
        );
        return { id: generatedId };
    }

    @Get()
    async getAllMovies() {
        const products = await this.moviesService.getMovies();
        return products;
    }

    @Get(':id')
    getMovie(@Param('id') movieId: string) {
        return this.moviesService.getSingleMovie(movieId);
    }

    @Patch(':id')
    async updateMovie(
        @Param('id') movieId: string,
        @Body('title') title: string,
        @Body('released') released: string,
        @Body('director') director: string,
        @Body('imdbVotes') imdbVotes: string,
        @Body('moviePlot') moviePlot: string,
        @Body('personName') personName: Array<string>,
        @Body('genre') genre: string,
        @Body('country') country: string,
        @Body('language') language: string,
        @Body('rating') rating: string,
    ) {
        await this.moviesService.updateMovie(
            movieId,
            title,
            released,
            director,
            imdbVotes,
            moviePlot,
            personName,
            genre,
            country,
            language,
            rating,
        );
        return null;
    }

    @Delete(':id')
    async removeMovie(@Param('id') movieId: string) {
        await this.moviesService.deleteMovie(movieId);
        return null;
    }
}