
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Land {
  id: string;
  title: string;
  description: string;
  location: string;
  size: number;
  images: string[];
  status: 'available' | 'cultivated' | 'harvest';
  progress: number;
  cultivator?: string;
  startDate?: string;
  estimatedHarvest?: string;
  ownerId: string;
}

interface LandsState {
  lands: Land[];
  isLoading: boolean;
  selectedLand: Land | null;
}

const initialState: LandsState = {
  lands: [],
  isLoading: false,
  selectedLand: null,
};

const landsSlice = createSlice({
  name: 'lands',
  initialState,
  reducers: {
    setLands: (state, action: PayloadAction<Land[]>) => {
      state.lands = action.payload;
      state.isLoading = false;
    },
    addLand: (state, action: PayloadAction<Land>) => {
      state.lands.push(action.payload);
    },
    updateLand: (state, action: PayloadAction<Land>) => {
      const index = state.lands.findIndex(land => land.id === action.payload.id);
      if (index !== -1) {
        state.lands[index] = action.payload;
      }
    },
    deleteLand: (state, action: PayloadAction<string>) => {
      state.lands = state.lands.filter(land => land.id !== action.payload);
    },
    setSelectedLand: (state, action: PayloadAction<Land | null>) => {
      state.selectedLand = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLands, addLand, updateLand, deleteLand, setSelectedLand, setLoading } = landsSlice.actions;
export default landsSlice.reducer;
