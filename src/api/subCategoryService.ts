// src/api/subCategoryService.ts
import { apiClient } from './apiClient';
import { ApiResponse } from './types';
import { Category } from './categoryService';

export interface SubCategory {
  id: string;
  subCategoryName: string;
  isActive: boolean;
  category: Category;
}

export interface SubCategoryRequest {
  subCategoryName: string;
  isActive: boolean;
  categoryId: string;
}

export const SubCategoryService = {
  getAllSubCategories: async (): Promise<ApiResponse<SubCategory[]>> => {
    const response = await apiClient.get<ApiResponse<SubCategory[]>>('/sub-categories');
    return response.data;
  },

  createSubCategory: async (subCategoryData: SubCategoryRequest): Promise<ApiResponse<SubCategory>> => {
    const response = await apiClient.post<ApiResponse<SubCategory>>('/sub-categories', subCategoryData);
    return response.data;
  },

  getSubCategoryById: async (id: string): Promise<ApiResponse<SubCategory>> => {
    const response = await apiClient.get<ApiResponse<SubCategory>>(`/sub-categories/${id}`);
    return response.data;
  },

  updateSubCategory: async (
    id: string,
    subCategoryData: Partial<SubCategoryRequest>
  ): Promise<ApiResponse<SubCategory>> => {
    const response = await apiClient.put<ApiResponse<SubCategory>>(`/sub-categories/${id}`, subCategoryData);
    return response.data;
  },

  deleteSubCategory: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/sub-categories/${id}`);
    return response.data;
  },
};