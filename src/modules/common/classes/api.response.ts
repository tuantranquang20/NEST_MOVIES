import { HttpStatus, Injectable } from '@nestjs/common';

const DEFAULT_SUCCESS_MESSAGE = 'success';

@Injectable()
export class ApiResponse<T> {
  public code: number;

  public message: string;

  public data: T;

  public errors: T;
}

export class CommonListResponse<T> {
  items: T[];

  totalItems: number;
}

export function makeErrorResponse<T>(
  code: HttpStatus,
  message: string,
  errors: T,
) {
  return {
    message,
    code,
    errors,
  };
}

export function makeSuccessResponse<T>(data?: T, message?: string) {
  return {
    message: message || DEFAULT_SUCCESS_MESSAGE,
    data,
    code: HttpStatus.OK,
  };
}
