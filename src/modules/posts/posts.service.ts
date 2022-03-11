import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Post } from 'src/db/models/post.entity';
import { Brackets, EntityManager } from 'typeorm';
import { RequestBodyDto } from '../movies/dto/requests/movie.request.dto';
import { RequestCreatePostDto } from './dto/requests/create-post.dto';
import { UpdatePostDto } from './dto/requests/update-post.dto';
import {
  DEFAULT_LIMIT_FOR_PAGINATION,
  DEFAULT_TOTAL_ITEM,
  MIN_PAGE,
} from '../common/common.constants';
import { paginateRaw } from 'nestjs-typeorm-paginate';

@Injectable()
export class PostsService {
  constructor(
    @InjectEntityManager()
    private readonly dbManager: EntityManager,
  ) {}
  async create(createPostDto: RequestCreatePostDto) {
    try {
      const newPost = await this.dbManager.save(Post, {
        ...createPostDto,
        time: moment().fmFullTimeString(),
      });
      return newPost;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all posts`;
  }

  async findAllPosts(id: number, body: RequestBodyDto) {
    const { limit = DEFAULT_LIMIT_FOR_PAGINATION, page = MIN_PAGE } = body;
    try {
      const posts = await this.dbManager
        .createQueryBuilder(Post, 'post')
        .where((queryBuilder) => {
          queryBuilder.andWhere(
            new Brackets((qb) => {
              qb.where('post.movieId = :id', {
                id: id,
              });
            }),
          );
        });
      const result = await this.dbManager.find(Post, {
        where: {
          movieId: id,
        },
        skip: limit * (page - 1) + 1,
        take: limit,
      });
      const postsAndPage = await paginateRaw(posts, {
        limit: limit,
        page: page,
      });
      return {
        items: result,
        totalItems: postsAndPage?.meta?.totalItems || DEFAULT_TOTAL_ITEM,
      };
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
