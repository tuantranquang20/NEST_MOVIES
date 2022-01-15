export interface IBodyResponseResult {
  code?: number;
  data?: Record<string, unknown>;
  message?: string;
  success?: boolean;
}

export interface IBodyResponseTMDB {
  results?: number;
  page?: number;
  total_results?: number;
  total_pages?: number;
}

export interface IBodyResponse {
  success: boolean;
  isNetworkError?: boolean;
  code: number;
  message: string;
  result: IBodyResponseResult;
  errors?: { key: string; errorCode: number }[];
}
