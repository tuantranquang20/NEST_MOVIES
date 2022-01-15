import { PartialType } from '@nestjs/mapped-types';
import { RequestCreateActorDto } from './create-actor.dto';

export class UpdateActorDto extends PartialType(RequestCreateActorDto) {}
