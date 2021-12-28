import { OrderDirection } from 'src/modules/common/common.constants';

// export const CreateMovieSchema = Joi.object().keys({}); // TODO

export class RequestGetMovieDto {
  page?: number;

  limit?: number;

  orderBy?: string;

  orderDirection?: OrderDirection;

  name?: string;
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
}
