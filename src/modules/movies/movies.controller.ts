import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
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
    const result = await this.moviesService.findAllMovieFromTMDB(query);
    return makeSuccessResponse(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query: { language: string }) {
    try {
      const result = await this.moviesService.findOneTMDB(+id, query);
      return makeSuccessResponse(result);
    } catch (error) {
      throw error;
    }
  }
  @Get(':id/cast')
  async findCastByMovieTMDB(@Param('id') id: string) {
    try {
      const result = await this.moviesService.findCastByMovieTMDB(+id);
      return makeSuccessResponse(result);
    } catch (error) {
      throw error;
    }
  }
}
