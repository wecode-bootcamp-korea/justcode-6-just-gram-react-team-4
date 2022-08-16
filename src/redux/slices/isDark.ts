import { createSlice } from '@reduxjs/toolkit';

export const theme = createSlice({
  name: 'theme',
  initialState: localStorage.getItem('theme') || 'light',
  reducers: {
    toggleTheme(state) {
      localStorage.setItem('theme', state === 'light' ? 'dark' : 'light');
      return state === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = theme.actions;
