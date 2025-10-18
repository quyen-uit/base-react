import { storage } from '@/utils';

export type LogoutHandler = () => void;
export type TokenUpdate = { token: string; refreshToken: string };

let logoutHandler: LogoutHandler | null = null;
let tokenUpdateHandler: ((update: TokenUpdate) => void) | null = null;

export const setLogoutHandler = (handler: LogoutHandler) => {
  logoutHandler = handler;
};

export const setTokenUpdateHandler = (handler: (update: TokenUpdate) => void) => {
  tokenUpdateHandler = handler;
};

export const handleLogout = () => {
  if (logoutHandler) {
    logoutHandler();
    return;
  }
  // Fallback: clear storage and hard redirect
  storage.clear();
  window.location.href = '/login';
};

export const handleTokenUpdate = (update: TokenUpdate) => {
  if (tokenUpdateHandler) {
    tokenUpdateHandler(update);
  }
};

