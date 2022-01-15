import { PartialType } from '@nestjs/mapped-types';
import { RequestCreateMoviePhotoDto } from './create-movie-photo.dto';

export class UpdateMoviePhotoDto extends PartialType(RequestCreateMoviePhotoDto) {}
