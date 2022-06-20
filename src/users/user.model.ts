/* eslint-disable */
import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
})

export interface User extends mongoose.Document {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}