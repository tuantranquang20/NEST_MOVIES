import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { MoviePhoto } from 'src/db/models/movie-photo.entity';
import { EntityManager } from 'typeorm';
import { RequestCreateMoviePhotoDto } from './dto/create-movie-photo.dto';
import { UpdateMoviePhotoDto } from './dto/update-movie-photo.dto';

@Injectable()
export class MoviePhotosService {
  constructor(
    @InjectEntityManager() private readonly dbManager: EntityManager,
  ) {}
  create(createMoviePhotoDto: RequestCreateMoviePhotoDto) {
    const result = this.dbManager.save(MoviePhoto, createMoviePhotoDto);
    return result;
  }

  findAll() {
    return `This action returns all moviePhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moviePhoto`;
  }

  update(id: number, updateMoviePhotoDto: UpdateMoviePhotoDto) {
    return `This action updates a #${id} moviePhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} moviePhoto`;
  }
}
