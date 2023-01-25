import jwt from 'jsonwebtoken';
import { AxiosClient } from './AxiosClient';

export const isValideToken = (token: string) => {
  if (!token) {
    return false;
  }

  const decoded: any = jwt.decode(token);
  const currenTime = Date.now() / 1000;

  return decoded?.exp > currenTime
}

export const setTokenToHeaders = (token: string) => {
  if (token) {
    AxiosClient.interceptors.request.use((config: any) => {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    });
  } else {
    delete AxiosClient.defaults.headers.common["Authorization"]
  }
}