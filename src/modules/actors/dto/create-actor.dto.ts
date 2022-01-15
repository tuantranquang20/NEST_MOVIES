import { UserGender } from 'src/modules/interface';

export class RequestCreateActorDto {
  readonly name: string;
  readonly gender: UserGender;
  readonly dateOfBirth: Date;
  readonly description: string;
  readonly nation: string;
  readonly type: string;
  readonly coverImage: string;
  readonly avatar: string;
}
