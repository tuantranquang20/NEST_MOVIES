import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './modules/common/common.module';
import { DatabaseModule } from './db/database.module';
import { MoviesModule } from './modules/movies/movies.module';
import { ParticipationsModule } from './modules/participations/participations.module';
import { ActorsModule } from './modules/actors/actors.module';
import { ActorPhotosModule } from './modules/actor-photos/actor-photos.module';
import { MoviePhotosModule } from './modules/movie-photos/movie-photos.module';

@Module({
  imports: [
    PostsModule,
    AuthModule,
    UsersModule,
    CommonModule,
    DatabaseModule,
    MoviesModule,
    ParticipationsModule,
    ActorsModule,
    ActorPhotosModule,
    MoviePhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
