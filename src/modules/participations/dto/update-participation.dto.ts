import { PartialType } from '@nestjs/mapped-types';
import { RequestCreateParticipationDto } from './create-participation.dto';

export class UpdateParticipationDto extends PartialType(
  RequestCreateParticipationDto,
) {}
