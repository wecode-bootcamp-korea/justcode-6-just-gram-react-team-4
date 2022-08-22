import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userInfo = createSlice({
  name: 'userInfo',
  initialState: {
    access_token: localStorage.getItem('access_token') || '',
  },
  reducers: {
    login(state, { payload }: PayloadAction<string>) {
      localStorage.setItem('access_token', payload);
      return {
        ...state,
        access_token: payload,
      };
    },
    logout(state) {
      localStorage.setItem('access_token', '');
      return {
        ...state,
        access_token: '',
      };
    },
  },
});

export const { login, logout } = userInfo.actions;
