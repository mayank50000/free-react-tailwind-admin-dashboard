// src/api/newsService.ts
import { apiClient } from './apiClient';
import { ApiResponse } from './types';
import { Country } from './countryService';
import { Region } from './regionService';
import { Category } from './categoryService';
import { SubCategory } from './subCategoryService';
import { sampleNews } from '../SmpleData/sampleNews';

export interface News {
  id: string;
  title: string;
  content: string;
  isGlobal: boolean;
  category?: Category;
  subCategory?: SubCategory;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  author: { name: string };
}

export interface NewsRequest {
  title: string;
  content: string;
  isGlobal: boolean;
  categoryId?: string;
  subCategoryId?: string;
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

  getPublicNews: async (page: number, limit: number = 20): Promise<ApiResponse<News[]>> => {
    const response = await apiClient.get<ApiResponse<News[]>>(
      '/news/public',
      { params: { page, limit } }
    );
    return response.data;
  },

  getSamplePublicNews: async (): Promise<News[]> => {
    // Simulate API delay
    debugger;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('SampleNews:', sampleNews);
    return sampleNews;
  },
};