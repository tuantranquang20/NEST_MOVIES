import { PartialType } from '@nestjs/mapped-types';
import { RequestCreateMovieDto } from './requests/movie.request.dto';

export class UpdateMovieDto extends PartialType(RequestCreateMovieDto) {}
