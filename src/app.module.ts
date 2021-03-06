/* eslint-disable */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MoviesModule, MongooseModule.forRoot('mongodb+srv://moviedbuser:moviedbpassword@cluster0.es1zz.mongodb.net/movieDB?retryWrites=true&w=majority'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
