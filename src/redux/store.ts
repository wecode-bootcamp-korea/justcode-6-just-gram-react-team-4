import { configureStore } from '@reduxjs/toolkit';
import { theme } from './slices/isDark';

const store = configureStore({
  reducer: {
    theme: theme.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
