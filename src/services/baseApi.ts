import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/constants';
import type { RootState } from '@/app/store';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth', 'Products', 'User', 'Health'],
  // Global cache configuration
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  refetchOnFocus: true, // Refetch when window regains focus
  refetchOnReconnect: true, // Refetch when network reconnects
  endpoints: () => ({}),
});
