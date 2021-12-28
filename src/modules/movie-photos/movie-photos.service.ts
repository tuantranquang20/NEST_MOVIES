import { Injectable } from '@nestjs/common';
import { CreateMoviePhotoDto } from './dto/create-movie-photo.dto';
import { UpdateMoviePhotoDto } from './dto/update-movie-photo.dto';

@Injectable()
export class MoviePhotosService {
  create(createMoviePhotoDto: CreateMoviePhotoDto) {
    return 'This action adds a new moviePhoto';
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
