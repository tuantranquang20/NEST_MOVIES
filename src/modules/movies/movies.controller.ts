import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { makeSuccessResponse } from '../common/classes/api.response';
import {
  RequestCreateMovieDto,
  RequestGetMovieDto,
} from './dto/requests/movie.request.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() createMovieDto: RequestCreateMovieDto) {
    const newMovie = await this.moviesService.createMovie(createMovieDto);
    return makeSuccessResponse(newMovie);
  }

  @Get()
  async findAll(@Query() query: RequestGetMovieDto) {
    const result = await this.moviesService.findAllMovie(query);
    return makeSuccessResponse(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.moviesService.findOne(+id);
      return makeSuccessResponse(result);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
