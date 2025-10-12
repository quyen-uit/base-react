import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types';
import { storage } from '@/utils';

const initialState: AuthState = {
  user: null,
  token: storage.getToken(),
  refreshToken: storage.getRefreshToken(),
  isAuthenticated: !!storage.getToken(),
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      storage.setToken(action.payload.token);
      storage.setRefreshToken(action.payload.refreshToken);
      storage.setUser(JSON.stringify(action.payload.user));
    },
    updateTokens: (state, action: PayloadAction<{ token: string; refreshToken: string }>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      storage.setToken(action.payload.token);
      storage.setRefreshToken(action.payload.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      storage.clear();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, updateTokens, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
