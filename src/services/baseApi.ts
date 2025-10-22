import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG, API_ENDPOINTS } from '@/constants';
import type { RootState } from '@/app/store';
import { updateTokens } from '@/app/authSlice';

const rawBaseQuery = fetchBaseQuery({
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
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(api: any, extraOptions: any): Promise<string | null> {
  // Perform refresh using httpOnly cookie; no body needed
  const refreshResult = await rawBaseQuery(
    { url: API_ENDPOINTS.AUTH.REFRESH, method: 'POST' },
    api,
    extraOptions
  );

  if (refreshResult.data && (refreshResult.data as any).token) {
    const newToken = (refreshResult.data as any).token as string;
    api.dispatch(updateTokens({ token: newToken }));
    return newToken;
  }
  return null;
}

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  // Execute request
  let result = await rawBaseQuery(args as any, api, extraOptions);

  // Handle 401 by refreshing once and retrying original request
  if (result.error && (result.error as any).status === 401) {
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken(api, extraOptions).finally(() => {
        // allow next refresh attempt
        setTimeout(() => {
          refreshPromise = null;
        }, 0);
      });
    }
    const token = await refreshPromise;
    if (token) {
      // Retry original request after successful refresh
      result = await rawBaseQuery(args as any, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth as any,
  tagTypes: ['Auth', 'Products', 'User', 'Health'],
  // Global cache configuration
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  refetchOnFocus: true, // Refetch when window regains focus
  refetchOnReconnect: true, // Refetch when network reconnects
  endpoints: () => ({}),
});
