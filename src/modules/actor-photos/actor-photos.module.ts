import { Module } from '@nestjs/common';
import { ActorPhotosService } from './actor-photos.service';
import { ActorPhotosController } from './actor-photos.controller';

@Module({
  controllers: [ActorPhotosController],
  providers: [ActorPhotosService]
})
export class ActorPhotosModule {}
