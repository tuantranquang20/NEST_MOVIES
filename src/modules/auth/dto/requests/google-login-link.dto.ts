import * as Joi from 'joi';

export const GoogleLoginLinkSchema = Joi.object({
  state: Joi.string().label('state'),
  redirectUri: Joi.string().uri().required().label('login'),
});
export class GoogleLoginLinkDto {
  readonly state: string;
  readonly redirectUri: string;
}
