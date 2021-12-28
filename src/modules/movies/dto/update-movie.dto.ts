import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviePhotoDto } from 'src/modules/movie-photos/dto/create-movie-photo.dto';

export class UpdateMovieDto extends PartialType(CreateMoviePhotoDto) {}
