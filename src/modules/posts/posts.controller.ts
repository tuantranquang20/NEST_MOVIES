import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { RequestCreatePostDto } from './dto/requests/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { makeSuccessResponse } from '../common/classes/api.response';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
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
