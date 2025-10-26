import { http, HttpResponse } from 'msw';

export const handlers = [
  // Auth current user
  http.get('/api/auth/me', () => {
    // Default: unauthenticated
    return HttpResponse.json(
      { message: 'Unauthenticated' },
      { status: 401 }
    );
  }),

  // Health check
  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'ok', timestamp: new Date().toISOString(), services: { database: 'up' } });
  }),
];

