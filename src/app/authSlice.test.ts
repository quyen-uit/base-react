import { describe, it, expect, beforeEach, vi } from 'vitest';
import authReducer, { setCredentials, updateTokens, logout, setLoading } from './authSlice';
import { AuthState, User } from '@/types';
import { storage } from '@/utils';

// Mock the storage utility
vi.mock('@/utils', () => ({
  storage: {
    getToken: vi.fn(),
    getRefreshToken: vi.fn(),
    setToken: vi.fn(),
    setRefreshToken: vi.fn(),
    setUser: vi.fn(),
    clear: vi.fn(),
  },
}));

describe('authSlice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const initialState: AuthState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
  };

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
  };

  const mockToken = 'mock-jwt-token';
  const mockRefreshToken = 'mock-refresh-token';

  describe('setCredentials', () => {
    it('should set user, token, refreshToken and authenticate', () => {
      const action = setCredentials({ user: mockUser, token: mockToken, refreshToken: mockRefreshToken });
      const state = authReducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.refreshToken).toBe(mockRefreshToken);
      expect(state.isAuthenticated).toBe(true);
      expect(storage.setToken).toHaveBeenCalledWith(mockToken);
      expect(storage.setRefreshToken).toHaveBeenCalledWith(mockRefreshToken);
      expect(storage.setUser).toHaveBeenCalledWith(JSON.stringify(mockUser));
    });

    it('should update existing state with new credentials', () => {
      const existingState: AuthState = {
        user: { id: '2', email: 'old@example.com', name: 'Old User', role: 'user' },
        token: 'old-token',
        refreshToken: 'old-refresh-token',
        isAuthenticated: true,
        isLoading: false,
      };

      const action = setCredentials({ user: mockUser, token: mockToken, refreshToken: mockRefreshToken });
      const state = authReducer(existingState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.refreshToken).toBe(mockRefreshToken);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('logout', () => {
    it('should clear user, token, and refreshToken', () => {
      const authenticatedState: AuthState = {
        user: mockUser,
        token: mockToken,
        refreshToken: mockRefreshToken,
        isAuthenticated: true,
        isLoading: false,
      };

      const state = authReducer(authenticatedState, logout());

      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.refreshToken).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(storage.clear).toHaveBeenCalled();
    });

    it('should work when already logged out', () => {
      const state = authReducer(initialState, logout());

      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.refreshToken).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('setLoading', () => {
    it('should set loading to true', () => {
      const state = authReducer(initialState, setLoading(true));
      expect(state.isLoading).toBe(true);
    });

    it('should set loading to false', () => {
      const loadingState: AuthState = { ...initialState, isLoading: true };
      const state = authReducer(loadingState, setLoading(false));
      expect(state.isLoading).toBe(false);
    });
  });

  describe('initial state', () => {
    it('should return the initial state', () => {
      vi.mocked(storage.getToken).mockReturnValue(null);
      vi.mocked(storage.getRefreshToken).mockReturnValue(null);
      const state = authReducer(undefined, { type: 'unknown' });
      expect(state).toMatchObject({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      expect(state.token).toBeFalsy();
      expect(state.refreshToken).toBeFalsy();
    });
  });

  describe('updateTokens', () => {
    it('should update tokens without changing user', () => {
      const stateWithUser: AuthState = {
        user: mockUser,
        token: 'old-token',
        refreshToken: 'old-refresh',
        isAuthenticated: true,
        isLoading: false,
      };

      const action = updateTokens({ token: mockToken, refreshToken: mockRefreshToken });
      const state = authReducer(stateWithUser, action);

      expect(state.token).toBe(mockToken);
      expect(state.refreshToken).toBe(mockRefreshToken);
      expect(state.user).toEqual(mockUser); // User should remain unchanged
      expect(storage.setToken).toHaveBeenCalledWith(mockToken);
      expect(storage.setRefreshToken).toHaveBeenCalledWith(mockRefreshToken);
    });
  });
});
