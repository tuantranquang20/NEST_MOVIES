import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, UsersService, PostsService],
})
export class MoviesModule {}
