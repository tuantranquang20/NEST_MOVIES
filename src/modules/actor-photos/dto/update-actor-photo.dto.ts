import { PartialType } from '@nestjs/mapped-types';
import { RequestCreateActorPhotoDto } from './create-actor-photo.dto';

export class UpdateActorPhotoDto extends PartialType(
  RequestCreateActorPhotoDto,
) {}
