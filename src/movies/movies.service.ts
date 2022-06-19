/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.model';
import { Model } from 'mongoose';


@Injectable()
export class MoviesService {
    private movies: Movie[] = [];
    constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>) { }
    async insertMovie(
        title: string,
        released: string,
        director: string,
        imdbVotes: string,
        moviePlot: string,
        personName: Array<string>,
        genre: string,
        country: string,
        language: string,
        rating: string,
    ) {
        const newMovie = new this.movieModel({ title, released, director, imdbVotes, moviePlot, personName, genre, country, language, rating });
        const result = await newMovie.save();
        console.log(result);
        return result.id as string;
    }

    async getMovies() {
        const movies = await this.movieModel.find().exec();
        // return movies as Movie[];
        return movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            released: movie.released,
            director: movie.director,
            imdbVotes: movie.imdbVotes,
            moviePlot: movie.moviePlot,
            personName: movie.personName,
            genre: movie.genre,
            country: movie.country,
            language: movie.language,
            rating: movie.rating,
        }));
        // return [...this.movies];
    }

    async getSingleMovie(movieId: string) {
        const movie = await this.findMovie(movieId);
        return {
            id: movie.id,
            title: movie.title,
            released: movie.released,
            director: movie.director,
            imdbVotes: movie.imdbVotes,
            moviePlot: movie.moviePlot,
            personName: movie.personName,
            genre: movie.genre,
            country: movie.country,
            language: movie.language,
            rating: movie.rating,
        };
    }

    async updateMovie(movieId: string, title: string, released: string, director: string, imdbVotes: string, moviePlot: string, personName: Array<string>, genre: string, country: string, language: string, rating: string) {
        const updatedMovie = await this.findMovie(movieId);
        if (title) {
            updatedMovie.title = title;
        }
        if (released) {
            updatedMovie.released = released;
        }
        if (director) {
            updatedMovie.director = director;
        }
        if (imdbVotes) {
            updatedMovie.imdbVotes = imdbVotes;
        }
        if (moviePlot) {
            updatedMovie.moviePlot = moviePlot;
        }
        if (personName) {
            updatedMovie.personName = personName;
        }
        if (genre) {
            updatedMovie.genre = genre;
        }
        if (country) {
            updatedMovie.country = country;
        }
        if (language) {
            updatedMovie.language = language;
        }
        if (rating) {
            updatedMovie.rating = rating;
        }
        updatedMovie.save()
    }

    async deleteMovie(movieId: string) {
        let result;
        try {
            result = await this.movieModel.deleteOne({ _id: movieId }).exec();
            if (result.deletedCount === 0) {
                throw new NotFoundException('Could not find movie');
            }
        } catch (err) {
            throw new NotFoundException('Could not find movie');
        }
        if (!result) {
            throw new NotFoundException('Could not find movie.');
        }
        return result;
    }

    private async findMovie(id: string): Promise<Movie> {
        let movie;
        try {
            movie = await this.movieModel.findById(id).exec();
        } catch (err) {
            throw new NotFoundException('Could not find movie');
        }
        if (!movie) {
            throw new NotFoundException('Could not find movie.');
        }
        return movie;
    }
}