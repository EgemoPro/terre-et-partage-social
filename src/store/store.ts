
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import landsSlice from './slices/landsSlice';
import publicLandsSlice from './slices/publicLandsSlice';
import proposalsSlice from './slices/proposalsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    lands: landsSlice,
    publicLands: publicLandsSlice,
    proposals: proposalsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
