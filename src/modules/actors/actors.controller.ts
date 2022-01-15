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
import { makeSuccessResponse } from '../common/classes/api.response';
import { ActorsService } from './actors.service';
import { RequestCreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  async create(@Body() createActorDto: RequestCreateActorDto) {
    try {
      const result = await this.actorsService.create(createActorDto);
      return makeSuccessResponse(result);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  findAll() {
    return this.actorsService.findAll();
  }

  @Get('/seed')
  seed() {
    return this.actorsService.seed();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.actorsService.findOne(+id);
      return makeSuccessResponse(result);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorsService.update(+id, updateActorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorsService.remove(+id);
  }
}
