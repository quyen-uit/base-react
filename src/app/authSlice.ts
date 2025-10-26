import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types';
// Inlined user persistence (no storage util)

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token?: string }>) => {
      state.user = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
      }
      state.isAuthenticated = true;
    },
    updateTokens: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
  },
});

export const { setCredentials, updateTokens, logout, setLoading, setInitialized } = authSlice.actions;
export default authSlice.reducer;
