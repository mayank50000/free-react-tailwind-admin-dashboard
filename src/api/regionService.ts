// src/api/regionService.ts
import { apiClient } from './apiClient';
import { ApiResponse } from './types';
import { Country } from './countryService';

export interface Region {
  id: string;
  regionName: string;
  isActive: boolean;
  country: Country; // Reference to Country interface from countryService
}

export interface RegionRequest {
  regionName: string;
  isActive: boolean;
  countryId: string; // For dropdown selection
}

export const RegionService = {
  getAllRegions: async (): Promise<ApiResponse<Region[]>> => {
    const response = await apiClient.get<ApiResponse<Region[]>>('/regions');
    return response.data;
  },

  getRegionById: async (id: string): Promise<ApiResponse<Region>> => {
    const response = await apiClient.get<ApiResponse<Region>>(`/regions/${id}`);
    return response.data;
  },

  createRegion: async (regionData: RegionRequest): Promise<ApiResponse<Region>> => {
    const response = await apiClient.post<ApiResponse<Region>>('/regions', regionData);
    return response.data;
  },

  updateRegion: async (
    id: string,
    regionData: Partial<RegionRequest>
  ): Promise<ApiResponse<Region>> => {
    const response = await apiClient.put<ApiResponse<Region>>(
      `/regions/${id}`,
      regionData
    );
    return response.data;
  },

  toggleRegionStatus: async (id: string): Promise<ApiResponse<Region>> => {
    const response = await apiClient.patch<ApiResponse<Region>>(
      `/regions/${id}/status`
    );
    return response.data;
  },

  deleteRegion: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/regions/${id}`);
    return response.data;
  },
};