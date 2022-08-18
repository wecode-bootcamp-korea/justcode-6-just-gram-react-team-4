import { createSlice } from '@reduxjs/toolkit';

export const userInfo = createSlice({
  name: 'userInfo',
  initialState: {
    isLogin: JSON.parse(localStorage.getItem('isLogin') || 'false') as boolean,
  },
  reducers: {
    login(state) {
      localStorage.setItem('isLogin', JSON.stringify(true));
      return {
        ...state,
        isLogin: true,
      };
    },
    logout(state) {
      localStorage.setItem('isLogin', JSON.stringify(false));
      return {
        ...state,
        isLogin: false,
      };
    },
  },
});

export const { login, logout } = userInfo.actions;
