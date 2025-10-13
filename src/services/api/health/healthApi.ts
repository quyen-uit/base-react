import { baseApi } from '../../baseApi';

interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
  services: {
    database: 'up' | 'down';
    redis?: 'up' | 'down';
  };
}

export const healthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    healthCheck: builder.query<HealthCheckResponse, void>({
      query: () => '/health',
    }),
  }),
});

export const { useHealthCheckQuery } = healthApi;
