import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviePhotosService } from './movie-photos.service';
import { RequestCreateMoviePhotoDto } from './dto/create-movie-photo.dto';
import { UpdateMoviePhotoDto } from './dto/update-movie-photo.dto';

@Controller('movie-photos')
export class MoviePhotosController {
  constructor(private readonly moviePhotosService: MoviePhotosService) {}

  @Post()
  create(@Body() createMoviePhotoDto: RequestCreateMoviePhotoDto) {
    return this.moviePhotosService.create(createMoviePhotoDto);
  }

  @Get()
  findAll() {
    return this.moviePhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviePhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoviePhotoDto: UpdateMoviePhotoDto) {
    return this.moviePhotosService.update(+id, updateMoviePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviePhotosService.remove(+id);
  }
}
