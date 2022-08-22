import { configureStore } from '@reduxjs/toolkit';
import { userInfo } from './slices/userInfo';

const store = configureStore({
  reducer: {
    userInfo: userInfo.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
