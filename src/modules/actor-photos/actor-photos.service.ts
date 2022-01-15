import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ActorPhoto } from 'src/db/models/actor-photo.entity';
import { EntityManager } from 'typeorm';
import { RequestCreateActorPhotoDto } from './dto/create-actor-photo.dto';
import { UpdateActorPhotoDto } from './dto/update-actor-photo.dto';

@Injectable()
export class ActorPhotosService {
  constructor(
    @InjectEntityManager() private readonly dbManager: EntityManager,
  ) {}
  async create(createActorPhotoDto: RequestCreateActorPhotoDto) {
    try {
      const result = await this.dbManager.save(ActorPhoto, createActorPhotoDto);
      return result;
    } catch (error) {
      throw error;
    }
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
