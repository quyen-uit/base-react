const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const storage = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
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
    localStorage.removeItem(USER_KEY);
  },
};
