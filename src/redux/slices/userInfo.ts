import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProfileResponse = {
  id: number;
  email: string;
};

export const userInfo = createSlice({
  name: 'userInfo',
  initialState: {
    access_token: localStorage.getItem('access_token') || '',
    email: '',
    id: 0,
    loading: false,
  },
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        loading: payload,
      };
    },
    login(state, { payload }: PayloadAction<string>) {
      localStorage.setItem('access_token', payload);
      return {
        ...state,
        access_token: payload,
      };
    },
    setProfile(state, { payload }: PayloadAction<ProfileResponse>) {
      return {
        ...state,
        ...payload,
      };
    },
    logout(state) {
      localStorage.setItem('access_token', '');
      return {
        ...state,
        access_token: '',
        email: '',
        id: 0,
      };
    },
  },
});

export const { login, logout, setProfile, setLoading } = userInfo.actions;
