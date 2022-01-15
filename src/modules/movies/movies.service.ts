import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Movie } from 'src/db/models/movie.entity';
import { EntityManager } from 'typeorm';
import axiosInstance from '../common/axios.config';
import {
  DEFAULT_ORDER_BY,
  DEFAULT_ORDER_DIRECTION,
  MIN_PAGE,
} from '../common/common.constants';
import { IBodyResponseTMDB } from '../common/common.interface';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
import {
  RequestCreateMovieDto,
  RequestGetMovieDto,
} from './dto/requests/movie.request.dto';
const API_KEY = process.env.API_KEY;

@Injectable()
export class MoviesService {
  constructor(
    @InjectEntityManager()
    private readonly dbManager: EntityManager,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async createMovie(createMovieDto: RequestCreateMovieDto) {
    try {
      const result = await this.dbManager.save(Movie, createMovieDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAllMovieFromTMDB(query: RequestGetMovieDto) {
    const {
      name,
      orderBy = DEFAULT_ORDER_BY,
      orderDirection = DEFAULT_ORDER_DIRECTION,
      language = 'vi-VN',
      page = MIN_PAGE,
    } = query;
    const result = (await axiosInstance.get(
      `/discover/movie?api_key=${API_KEY}&page=${page}&language=${language}&sort_by=${orderBy}.${orderDirection}&without_keywords=${name}`,
    )) as IBodyResponseTMDB;
    return {
      item: result?.results,
      totalItems: result?.total_results,
    };
  }

  async findOneTMDB(id: number, query: { language: string }) {
    const { language } = query;
    const result = await axiosInstance.get(
      `/movie/${id}?api_key=${API_KEY}&language=${language}`,
    );
    return result;
  }

  async findCastByMovieTMDB(id: number) {
    const result = await axiosInstance.get(
      `/movie/${id}/credits?api_key=${API_KEY}`,
    );
    return result;
  }
}
