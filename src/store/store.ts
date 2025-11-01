import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import testimonialsReducer from './slices/testimonialsSlice';
import uiReducer from './slices/uiSlice';
import homeReducer from './slices/homeSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    testimonials: testimonialsReducer,
    ui: uiReducer,
    home: homeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

