const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';

// Simple encryption/decryption for localStorage
// Note: This is not cryptographically secure, just obfuscation
// For true security, use httpOnly cookies or a more robust solution
const ENCRYPTION_KEY = 'react-claude-secret-key'; // In production, use env variable

function simpleEncrypt(text: string): string {
  try {
    return btoa(
      text
        .split('')
        .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)))
        .join('')
    );
  } catch {
    return text;
  }
}

function simpleDecrypt(encoded: string): string {
  try {
    return atob(encoded)
      .split('')
      .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)))
      .join('');
  } catch {
    return encoded;
  }
}

export const storage = {
  getToken: (): string | null => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? simpleDecrypt(token) : null;
  },

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, simpleEncrypt(token));
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  getRefreshToken: (): string | null => {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);
    return token ? simpleDecrypt(token) : null;
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, simpleEncrypt(token));
  },

  removeRefreshToken: (): void => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getUser: (): string | null => {
    return localStorage.getItem(USER_KEY);
  },

  setUser: (user: string): void => {
    localStorage.setItem(USER_KEY, user);
  },

  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  clear: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Check if token is expired (JWT tokens have exp field)
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp * 1000 < Date.now() : false;
    } catch {
      return true;
    }
  },

  // Get token expiration time
  getTokenExpiration: (token: string): number | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp * 1000 : null;
    } catch {
      return null;
    }
  },
};
