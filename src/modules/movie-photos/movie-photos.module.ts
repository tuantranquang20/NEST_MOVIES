import { Module } from '@nestjs/common';
import { MoviePhotosService } from './movie-photos.service';
import { MoviePhotosController } from './movie-photos.controller';

@Module({
  controllers: [MoviePhotosController],
  providers: [MoviePhotosService]
})
export class MoviePhotosModule {}
