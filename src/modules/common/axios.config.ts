import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IBodyResponse } from './common.interface';

const API_BASE = 'https://api.themoviedb.org/3';
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    const data = response?.data as IBodyResponse;
    return data;
  },
  async (error) => {
    if (error.response) {
      const data = error.response?.data as IBodyResponse;
      const result = data?.result || {};
      result.success = false;
      return result;
    } else if (error.request) {
      // can not execute the request (network error or service is off)
      const data = error.request?.data || {};

      return {
        ...data,
        success: false,
        message: error.message,
      };
    }
  },
);
axiosInstance.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    return request;
  },
  async (error) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;
