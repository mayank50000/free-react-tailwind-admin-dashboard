export interface ApiResponse<T> {
    data: T;
    message: string;
    status: string;
  }

  export interface PaginatedResponse<T> {
    data: T[];          // Array of items for the current page
    page: number;       // Current page number
    pageSize: number;   // Number of items per page
    totalItems: number; // Total number of items across all pages
    totalPages: number; // Total number of pages
  }