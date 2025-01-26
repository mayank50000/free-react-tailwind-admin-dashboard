// src/api/newsService.ts
import { apiClient } from './apiClient';
import { ApiResponse } from './types';
import { Country } from './countryService';
import { Region } from './regionService';

export interface News {
  id: string;
  title: string;
  content: string;
  country?: Country;
  region?: Region;
  isGlobal: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsRequest {
  title: string;
  content: string;
  countryId?: string;
  regionId?: string;
  isGlobal: boolean;
}

export const NewsService = {
  getAllNews: async (): Promise<ApiResponse<News[]>> => {
    const response = await apiClient.get<ApiResponse<News[]>>('/news');
    return response.data;
  },

  getGlobalNews: async (): Promise<ApiResponse<News[]>> => {
    const response = await apiClient.get<ApiResponse<News[]>>('/news/global');
    return response.data;
  },

  getNewsById: async (id: string): Promise<ApiResponse<News>> => {
    const response = await apiClient.get<ApiResponse<News>>(`/news/${id}`);
    return response.data;
  },

  createNews: async (newsData: NewsRequest): Promise<ApiResponse<News>> => {
    const response = await apiClient.post<ApiResponse<News>>('/news', newsData);
    return response.data;
  },

  updateNews: async (
    id: string,
    newsData: Partial<NewsRequest>
  ): Promise<ApiResponse<News>> => {
    const response = await apiClient.put<ApiResponse<News>>(`/news/${id}`, newsData);
    return response.data;
  },

  toggleGlobalStatus: async (id: string): Promise<ApiResponse<News>> => {
    const response = await apiClient.patch<ApiResponse<News>>(
      `/news/${id}/global-status`
    );
    return response.data;
  },

  deleteNews: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/news/${id}`);
    return response.data;
  },

  getNewsByCountry: async (countryId: string): Promise<ApiResponse<News[]>> => {
    const response = await apiClient.get<ApiResponse<News[]>>(
      `/news/country/${countryId}`
    );
    return response.data;
  },

  getNewsByRegion: async (regionId: string): Promise<ApiResponse<News[]>> => {
    const response = await apiClient.get<ApiResponse<News[]>>(
      `/news/region/${regionId}`
    );
    return response.data;
  },
};