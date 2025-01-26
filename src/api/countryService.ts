// src/api/countryService.ts
import { apiClient } from './apiClient';
import { ApiResponse, PaginatedResponse } from './types';

export interface Country {
    id: string;
    countryName: string;
    isActive: boolean;
}

export interface CountryRequest {
    countryName: string;
    isActive: boolean;
}

interface GetCountriesParams {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export const CountryService = {
    getAllCountries: async (): Promise<ApiResponse<Country[]>> => {
        const response = await apiClient.get<ApiResponse<Country[]>>('/countries');
        return response.data;
    },

    getCountryById: async (id: string): Promise<ApiResponse<Country>> => {
        const response = await apiClient.get<ApiResponse<Country>>(`/countries/${id}`);
        return response.data;
    },

    createCountry: async (countryData: CountryRequest): Promise<ApiResponse<Country>> => {
        const response = await apiClient.post<ApiResponse<Country>>('/countries', countryData);
        return response.data;
    },

    updateCountry: async (
        id: string,
        countryData: Partial<CountryRequest>
    ): Promise<ApiResponse<Country>> => {
        const response = await apiClient.put<ApiResponse<Country>>(
            `/countries/${id}`,
            countryData
        );
        return response.data;
    },

    toggleCountryStatus: async (id: string): Promise<ApiResponse<Country>> => {
        const response = await apiClient.patch<ApiResponse<Country>>(
            `/countries/${id}/status`
        );
        return response.data;
    },

    deleteCountry: async (id: string): Promise<ApiResponse<void>> => {
        const response = await apiClient.delete<ApiResponse<void>>(`/countries/${id}`);
        return response.data;
    },

    searchCountries: async (query: string): Promise<ApiResponse<Country[]>> => {
        const response = await apiClient.get<ApiResponse<Country[]>>(
            '/countries/search',
            { params: { q: query } }
        );
        return response.data;
    },

    getCountriesPaginated: async (
        page: number,
        pageSize: number
    ): Promise<ApiResponse<PaginatedResponse<Country>>> => {
        const response = await apiClient.get<ApiResponse<PaginatedResponse<Country>>>(
            '/countries',
            { params: { page, pageSize } }
        );
        return response.data;
    },
    // Updated getAllCountries with params
    // getAllCountries: async (
    //     params?: GetCountriesParams
    // ): Promise<ApiResponse<Country[]>> => {
    //     const response = await apiClient.get<ApiResponse<Country[]>>('/countries', {
    //         params
    //     });
    //     return response.data;
    // },
};