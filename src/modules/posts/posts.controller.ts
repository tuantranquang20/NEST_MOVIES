import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { RequestCreatePostDto } from './dto/requests/create-post.dto';
import { UpdatePostDto } from './dto/requests/update-post.dto';
import { makeSuccessResponse } from '../common/classes/api.response';
import { RequestBodyDto } from '../movies/dto/requests/movie.request.dto';
import { PostsResource } from './dto/responses/post.response';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: RequestCreatePostDto) {
    try {
      const result = await this.postsService.create(createPostDto);
      return makeSuccessResponse(result);
    } catch (error) {
      console.log(error, 'error');
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.postsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id') // id movie
  async findAllPosts(@Param('id') id: string, @Query() body: RequestBodyDto) {
    // const result = await this.postsService.findAllPosts(+id, body);
    // return makeSuccessResponse(result);
    const { items, totalItems } = await this.postsService.findAllPosts(
      +id,
      body,
    );
    return makeSuccessResponse(
      PostsResource.collectionWithPaginate(items, totalItems),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
