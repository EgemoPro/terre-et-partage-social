
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PublicLand {
  id: string;
  title: string;
  description: string;
  location: string;
  size: number;
  images: string[];
  owner: {
    id: string;
    name: string;
    avatar?: string;
  };
  soilType: string;
  waterAccess: boolean;
  equipmentAvailable: boolean[];
  preferredCrops: string[];
  availableFrom: string;
  rentPrice?: number;
  sharePercentage?: number;
}

interface PublicLandsState {
  lands: PublicLand[];
  isLoading: boolean;
  searchFilters: {
    location: string;
    minSize: number;
    maxSize: number;
    soilType: string;
    waterAccess: boolean | null;
    availableFrom: string;
  };
}

const initialState: PublicLandsState = {
  lands: [],
  isLoading: false,
  searchFilters: {
    location: '',
    minSize: 0,
    maxSize: 10000,
    soilType: '',
    waterAccess: null,
    availableFrom: '',
  },
};

const publicLandsSlice = createSlice({
  name: 'publicLands',
  initialState,
  reducers: {
    setPublicLands: (state, action: PayloadAction<PublicLand[]>) => {
      state.lands = action.payload;
      state.isLoading = false;
    },
    setSearchFilters: (state, action: PayloadAction<Partial<PublicLandsState['searchFilters']>>) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setPublicLands, setSearchFilters, setLoading } = publicLandsSlice.actions;
export default publicLandsSlice.reducer;
