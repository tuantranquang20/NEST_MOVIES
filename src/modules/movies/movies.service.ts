import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { paginateRaw } from 'nestjs-typeorm-paginate';
import { Movie } from 'src/db/models/movie.entity';
import { Post } from 'src/db/models/post.entity';
import { User } from 'src/db/models/user.entity';
import { Brackets, EntityManager, Like } from 'typeorm';
import {
  DEFAULT_LIMIT_FOR_PAGINATION,
  DEFAULT_ORDER_BY,
  DEFAULT_ORDER_DIRECTION,
  MIN_PAGE,
  ORDER_DIRECTION,
} from '../common/common.constants';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
import {
  RequestCreateMovieDto,
  RequestGetMovieDto,
} from './dto/requests/movie.request.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

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

  async findAllMovie(query: RequestGetMovieDto) {
    const {
      limit = DEFAULT_LIMIT_FOR_PAGINATION,
      name,
      orderBy = DEFAULT_ORDER_BY,
      orderDirection = DEFAULT_ORDER_DIRECTION,
      page = MIN_PAGE,
    } = query;
    const _queryBuilder = this.dbManager
      .createQueryBuilder(Movie, 'movie')
      .where((queryBuilder) => {
        if (name) {
          queryBuilder.andWhere({
            name: Like(`%${name}%`),
          });
        }
      })
      .orderBy(orderBy, orderDirection.toUpperCase() as ORDER_DIRECTION);
    const resultQueryBuilder = await paginateRaw(_queryBuilder, {
      limit: +limit,
      page: +page,
    });
    return {
      item: resultQueryBuilder?.items,
      totalItems: resultQueryBuilder?.meta?.totalItems,
    };
  }

  async findOne(id: number) {
    const _queryBuilderGetMovie = await this.dbManager
      .createQueryBuilder(Movie, 'movie')
      .where((queryBuilder) => {
        if (id) {
          queryBuilder.andWhere(
            new Brackets((qb) => {
              qb.where('movie.id = :id', {
                id: id,
              });
            }),
          );
        }
      })
      .getRawOne();

    const _queryBuilderGetPost = await this.dbManager
      .createQueryBuilder(Post, 'post')
      .leftJoin(Movie, 'movie', 'post.movieId = movie.id')
      .leftJoin(User, 'user', 'user.id = post.userId')
      .where((queryBuilder) => {
        if (id) {
          queryBuilder.andWhere(
            new Brackets((qb) => {
              qb.where('movie.id = :id', {
                id: id,
              });
            }),
          );
        }
      })
      .getRawMany();
    return {
      ..._queryBuilderGetMovie,
      post: _queryBuilderGetPost,
    };
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
