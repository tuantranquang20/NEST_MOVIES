import { OrderDirection } from 'src/modules/common/common.constants';

// export const CreateMovieSchema = Joi.object().keys({}); // TODO
export class RequestBodyDto {
  page?: number;

  limit?: number;
}
export class RequestGetMovieDto extends RequestBodyDto {
  orderBy?: string;

  orderDirection?: OrderDirection;

  name?: string;

  language?: string;
}

export class RequestCreateMovieDto {
  readonly name: string;
  readonly year: Date;
  readonly description: string;
  readonly IMDBPoint: string;
  readonly type: string;
  readonly nation: string;
  readonly trailer: string;
  readonly time: string;
  readonly session: string;
  readonly coverImage: string;
  readonly avatar: string;
}
