import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { API_CONFIG, API_ENDPOINTS } from '@/constants';
import { getCsrfToken } from '@/utils';

export const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true,
});

// Configure axios-retry for automatic retries
axiosRetry(axiosInstance, {
  retries: API_CONFIG.RETRY_ATTEMPTS,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    // Retry on network errors or 5xx errors
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (error.response?.status ? error.response.status >= 500 : false)
    );
  },
  onRetry: (retryCount, _error, requestConfig) => {
    console.log(`Retry attempt ${retryCount} for ${requestConfig.url}`);
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

let getAccessToken: () => string | null = () => null;
export const setAccessTokenGetter = (fn: () => string | null) => {
  getAccessToken = fn;
};

let onTokenRefreshed: (token: string) => void = () => {};
export const setOnTokenRefreshed = (fn: (token: string) => void) => {
  onTokenRefreshed = fn;
};

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // CSRF header for non-GET
    if (config.method && config.method.toUpperCase() !== 'GET' && config.headers) {
      const csrf = getCsrfToken();
      if (csrf) {
        (config.headers as any)['X-CSRF-Token'] = csrf;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token using httpOnly refresh cookie
        const response = await axios.post(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {}, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        });

        const { token: newToken } = response.data as { token: string };

        // Update application state with new token
        onTokenRefreshed(newToken);

        // Update header for original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        // Process queued requests
        processQueue(null, newToken);

        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout
        processQueue(refreshError as AxiosError, null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Request cancellation helper
export const createCancelToken = () => {
  return axios.CancelToken.source();
};
