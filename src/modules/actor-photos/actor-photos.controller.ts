import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActorPhotosService } from './actor-photos.service';
import { RequestCreateActorPhotoDto } from './dto/create-actor-photo.dto';
import { UpdateActorPhotoDto } from './dto/update-actor-photo.dto';

@Controller('actor-photos')
export class ActorPhotosController {
  constructor(private readonly actorPhotosService: ActorPhotosService) {}

  @Post()
  create(@Body() createActorPhotoDto: RequestCreateActorPhotoDto) {
    return this.actorPhotosService.create(createActorPhotoDto);
  }

  @Get()
  findAll() {
    return this.actorPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorPhotoDto: UpdateActorPhotoDto) {
    return this.actorPhotosService.update(+id, updateActorPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorPhotosService.remove(+id);
  }
}
