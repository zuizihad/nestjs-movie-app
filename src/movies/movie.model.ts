/* eslint-disable */
import * as mongoose from 'mongoose'

export const MovieSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    released: { type: String, trim: true, required: true },
    director: { type: String, trim: true, required: true },
    imdbVotes: { type: String, trim: true, required: true },
    moviePlot: { type: String, trim: true, required: true },
    personName: { type: Array, required: true },
    genre: { type: String, required: true },
    country: { type: String, required: true },
    language: { type: String, required: true },
    rating: { type: String, required: true },
})

export interface Movie extends mongoose.Document {
    id: string;
    title: string;
    released: string;
    director: string;
    imdbVotes: string;
    moviePlot: string;
    personName: Array<string>;
    genre: string;
    country: string;
    language: string;
    rating: string;
}