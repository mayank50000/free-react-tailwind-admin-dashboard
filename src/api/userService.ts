// src/api/userService.ts
import { apiClient } from './apiClient';
import { ApiResponse } from './types';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'USER';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRequest {
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'USER';
  password?: string;
  isActive: boolean;
}

export const UserService = {
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await apiClient.get<ApiResponse<User[]>>('/users');
    return response.data;
  },

  createUser: async (userData: UserRequest): Promise<ApiResponse<User>> => {
    const response = await apiClient.post<ApiResponse<User>>('/users', userData);
    return response.data;
  },

  updateUser: async (
    id: string,
    userData: Partial<UserRequest>
  ): Promise<ApiResponse<User>> => {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/users/${id}`);
    return response.data;
  },

  toggleUserStatus: async (id: string): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/status`);
    return response.data;
  },
};