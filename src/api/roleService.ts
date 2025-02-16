// src/api/roleService.ts
import { apiClient } from './apiClient';
import { ApiResponse } from './types';

export interface Role {
  id: string;
  roleName: string;
  permissions: string[];
  isActive: boolean;
}

export interface RoleRequest {
  roleName: string;
  permissions: string[];
  isActive: boolean;
}

export const RoleService = {
  getAllRoles: async (): Promise<ApiResponse<Role[]>> => {
    const response = await apiClient.get<ApiResponse<Role[]>>('/roles');
    return response.data;
  },

  createRole: async (roleData: RoleRequest): Promise<ApiResponse<Role>> => {
    const response = await apiClient.post<ApiResponse<Role>>('/roles', roleData);
    return response.data;
  },

  updateRole: async (
    id: string,
    roleData: Partial<RoleRequest>
  ): Promise<ApiResponse<Role>> => {
    const response = await apiClient.put<ApiResponse<Role>>(`/roles/${id}`, roleData);
    return response.data;
  },

  deleteRole: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/roles/${id}`);
    return response.data;
  },
};