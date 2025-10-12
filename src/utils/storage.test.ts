import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from './storage';

describe('storage utility', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Token management', () => {
    it('should store and retrieve token', () => {
      const token = 'test-token-123';
      storage.setToken(token);
      expect(storage.getToken()).toBe(token);
    });

    it('should return null when token does not exist', () => {
      expect(storage.getToken()).toBeNull();
    });

    it('should remove token', () => {
      storage.setToken('test-token');
      storage.removeToken();
      expect(storage.getToken()).toBeNull();
    });
  });

  describe('User management', () => {
    it('should store and retrieve user data', () => {
      const user = JSON.stringify({ id: 1, name: 'Test User' });
      storage.setUser(user);
      expect(storage.getUser()).toBe(user);
    });

    it('should return null when user does not exist', () => {
      expect(storage.getUser()).toBeNull();
    });

    it('should remove user', () => {
      storage.setUser(JSON.stringify({ id: 1, name: 'Test' }));
      storage.removeUser();
      expect(storage.getUser()).toBeNull();
    });
  });

  describe('Clear all', () => {
    it('should clear both token and user', () => {
      storage.setToken('test-token');
      storage.setUser(JSON.stringify({ id: 1 }));

      storage.clear();

      expect(storage.getToken()).toBeNull();
      expect(storage.getUser()).toBeNull();
    });

    it('should not affect other localStorage items', () => {
      localStorage.setItem('other-key', 'other-value');
      storage.setToken('test-token');

      storage.clear();

      expect(localStorage.getItem('other-key')).toBe('other-value');
      expect(storage.getToken()).toBeNull();
    });
  });
});
