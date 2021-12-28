import * as Joi from 'joi';

export const GoogleLoginSchema = Joi.object({
  code: Joi.string().required().label('code'),
  redirectUri: Joi.string().uri().required().label('uri'),
});
export class GoogleLoginDto {
  readonly code: string;

  readonly redirectUri: string;
}
