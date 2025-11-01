import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { testimonialsAPI } from '../../lib/api';

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  rating: number;
  comment: string;
  image?: string;
  location?: string;
  project?: string;
  date: string;
  featured?: boolean;
}

interface TestimonialsState {
  testimonials: Testimonial[];
  featuredTestimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialsState = {
  testimonials: [],
  featuredTestimonials: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchAll',
  async (params: { featured?: boolean; limit?: number } | undefined = undefined, { rejectWithValue }) => {
    try {
      const response = await testimonialsAPI.getAll(params);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue('Failed to fetch testimonials');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch testimonials');
    }
  }
);

export const fetchFeaturedTestimonials = createAsyncThunk(
  'testimonials/fetchFeatured',
  async (limit: number | undefined = undefined, { rejectWithValue }) => {
    try {
      const response = await testimonialsAPI.getFeatured(limit);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue('Failed to fetch featured testimonials');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch featured testimonials');
    }
  }
);

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    setTestimonials: (state, action: PayloadAction<Testimonial[]>) => {
      state.testimonials = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
        state.error = null;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch featured testimonials
      .addCase(fetchFeaturedTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredTestimonials = action.payload;
        state.error = null;
      })
      .addCase(fetchFeaturedTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTestimonials } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;

