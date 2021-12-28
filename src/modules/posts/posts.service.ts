import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Post } from 'src/db/models/post.entity';
import { EntityManager } from 'typeorm';
import { RequestCreatePostDto } from './dto/requests/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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

  async findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
