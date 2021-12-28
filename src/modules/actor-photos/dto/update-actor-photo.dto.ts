import { PartialType } from '@nestjs/mapped-types';
import { CreateActorPhotoDto } from './create-actor-photo.dto';

export class UpdateActorPhotoDto extends PartialType(CreateActorPhotoDto) {}
