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
import { ParticipationsService } from './participations.service';
import { RequestCreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { makeSuccessResponse } from '../common/classes/api.response';

@Controller('participations')
export class ParticipationsController {
  constructor(private readonly participationsService: ParticipationsService) {}

  @Post()
  async create(@Body() createParticipationDto: RequestCreateParticipationDto) {
    try {
      const result = await this.participationsService.create(
        createParticipationDto,
      );
      return makeSuccessResponse(result);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  findAll() {
    return this.participationsService.findAll();
  }

  @Get('/seed')
  seed() {
    return this.participationsService.seed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipationDto: UpdateParticipationDto,
  ) {
    return this.participationsService.update(+id, updateParticipationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participationsService.remove(+id);
  }
}
