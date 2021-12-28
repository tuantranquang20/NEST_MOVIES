import { Injectable } from '@nestjs/common';
import { CreateActorPhotoDto } from './dto/create-actor-photo.dto';
import { UpdateActorPhotoDto } from './dto/update-actor-photo.dto';

@Injectable()
export class ActorPhotosService {
  create(createActorPhotoDto: CreateActorPhotoDto) {
    return 'This action adds a new actorPhoto';
  }

  findAll() {
    return `This action returns all actorPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actorPhoto`;
  }

  update(id: number, updateActorPhotoDto: UpdateActorPhotoDto) {
    return `This action updates a #${id} actorPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} actorPhoto`;
  }
}
