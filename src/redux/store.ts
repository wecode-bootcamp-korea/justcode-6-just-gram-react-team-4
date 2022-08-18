import { configureStore } from '@reduxjs/toolkit';
import { theme } from './slices/isDark';
import { userInfo } from './slices/userInfo';

const store = configureStore({
  reducer: {
    theme: theme.reducer,
    userInfo: userInfo.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
