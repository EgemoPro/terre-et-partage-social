
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import landsSlice from './slices/landsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    lands: landsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
