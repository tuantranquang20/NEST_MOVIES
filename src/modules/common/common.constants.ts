export enum Languages {
  EN = 'en',
  VI = 'vi',
}

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum UserAction {
  POST = 'create',
  PATCH = 'update',
  DELETE = 'delete',
}

export enum HttpMethods {
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
}

export const approved = { TRUE: 1, FALSE: 0 };

export const DEFAULT_LIMIT_FOR_DROPDOWN = 1000;
export const DEFAULT_LIMIT_FOR_PAGINATION = 10;
export const DEFAULT_ORDER_BY = 'popularity';
export const DEFAULT_ORDER_DIRECTION = 'desc';
export type ORDER_DIRECTION = 'ASC' | 'DESC';

export const MIN_ID = 1;
export const MIN_PAGE_SIZE = 0;
export const MIN_PAGE = 1;
export const MAX_PAGE_SIZE = 10000;
export const MAX_PAGE = 10000;

export const BIRTHDAY_MIN_DATE = '1800-01-01';

export const INPUT_TEXT_MAX_LENGTH = 255;
export const INPUT_PHONE_MAX_LENGTH = 11;

export const TEXTAREA_MAX_LENGTH = 2000;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,20}$/;

export const PHONE_NUMBER_REGEX = /^(\d*).{10,11}$/;

export const DATE_FORMAT = 'YYYY-MM-DD';

export const FULL_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';

export const FIVE_DAYS = 5 * 86400;

export const DAY = 86400;

export const MAX_CITIZEN_ID_LENGTH = 12;
export const MIN_CITIZEN_ID_LENGTH = 9;

export const MAX_BANK_ACCOUNT_LENGTH = 14;
export const MIN_BANK_ACCOUNT_LENGTH = 9;

export const MAX_SOCIAL_INSURANCE_LENGTH = 13;
export const MIN_SOCIAL_INSURANCE_LENGTH = 10;

export const MAX_TAX_CODE_LENGTH = 13;
export const MIN_TAX_CODE_LENGTH = 10;

export const READ_FINGER_SCANNER_DATE_FORMAT = 'YYYYMMDD';

export const MAX_LENGTH_MONTH = 12;
export const MIN_LENGTH_MONTH = 1;
export const URL_REGEX =
  /^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
