import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse } from './types';

const BASE_URL = '';//process.env.REACT_APP_API_BASE_URL;
const TIMEOUT = 10000;//parseInt(process.env.REACT_APP_API_TIMEOUT || '10000');

const createAxiosInstance = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL || BASE_URL,
    timeout: TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Request interceptor
//   instance.interceptors.request.use(
//     (config: AxiosRequestConfig) => {
//       // Add auth token or other headers here
//       // const token = localStorage.getItem('token');
//       // if (token) {
//       //   config.headers.Authorization = `Bearer ${token}`;
//       // }
//       return config;
//     },
//     (error: AxiosError) => {
//       return Promise.reject(error);
//     }
//   );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse<any>>) => {
      // You can add global success handling here
      if (response.data.status !== 'success') {
        // Handle business logic errors
        return Promise.reject(new Error(response.data.message));
      }
      return response;
    },
    (error: AxiosError<ApiResponse<any>>) => {
      // Handle HTTP errors
      const errorMessage = error.response?.data?.message || error.message;
      return Promise.reject(new Error(errorMessage));
    }
  );

  return instance;
};

export const apiClient = createAxiosInstance();

// Optional: Create different instances for different APIs
// export const anotherApiClient = createAxiosInstance('https://another.api.url');