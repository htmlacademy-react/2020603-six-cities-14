import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { processErrorHandle } from './utils';
import { BASE_URL, REQUEST_TIMEOUT } from './const';

type DetailMessageError = {
  type: string;
  message: string;
}

const StatusCodesMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

function shouldDisplayError(response: AxiosResponse) {
  return Boolean(StatusCodesMapping[response.status]);
}

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageError>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;
        processErrorHandle(detailMessage.message);
      }

      throw error;
    });

  return api;
}
