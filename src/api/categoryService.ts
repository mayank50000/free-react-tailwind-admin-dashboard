// src/api/categoryService.ts
import { apiClient } from './apiClient';
import { ApiResponse } from './types';

export interface Category {
  id: string;
  categoryName: string;
  isActive: boolean;
}

export interface CategoryRequest {
  categoryName: string;
  isActive: boolean;
}

export const CategoryService = {
  getAllCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
    return response.data;
  },

  createCategory: async (categoryData: CategoryRequest): Promise<ApiResponse<Category>> => {
    const response = await apiClient.post<ApiResponse<Category>>('/categories', categoryData);
    return response.data;
  },

  getCategoryById: async (id: string): Promise<ApiResponse<Category>> => {
    const response = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data;
  },

  updateCategory: async (
    id: string,
    categoryData: Partial<CategoryRequest>
  ): Promise<ApiResponse<Category>> => {
    const response = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/categories/${id}`);
    return response.data;
  },
};