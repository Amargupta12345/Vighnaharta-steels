import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { homeAPI } from '../../lib/api';

interface HomeData {
  hero?: {
    title: string;
    subtitle: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

interface HomeState {
  data: HomeData | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk
export const fetchHomeData = createAsyncThunk(
  'home/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await homeAPI.getData();
      if (response.success) {
        return response.data;
      }
      return rejectWithValue('Failed to fetch home data');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch home data');
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHomeData: (state, action: PayloadAction<HomeData>) => {
      state.data = action.payload;
    },
    clearHomeData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setHomeData, clearHomeData } = homeSlice.actions;
export default homeSlice.reducer;

