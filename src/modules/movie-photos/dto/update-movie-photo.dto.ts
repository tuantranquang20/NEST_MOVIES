import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviePhotoDto } from './create-movie-photo.dto';

export class UpdateMoviePhotoDto extends PartialType(CreateMoviePhotoDto) {}
