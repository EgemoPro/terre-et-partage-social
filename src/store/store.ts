
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import landsSlice from './slices/landsSlice';
import publicLandsSlice from './slices/publicLandsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    lands: landsSlice,
    publicLands: publicLandsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
