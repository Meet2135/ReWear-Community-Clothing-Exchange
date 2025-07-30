import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Import slices
import authSlice from './slices/authSlice';
import itemSlice from './slices/itemSlice';
import swapSlice from './slices/swapSlice';
import userSlice from './slices/userSlice';
import uiSlice from './slices/uiSlice';
import adminSlice from './slices/adminSlice';

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  items: itemSlice,
  swaps: swapSlice,
  user: userSlice,
  ui: uiSlice,
  admin: adminSlice,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types for TypeScript (if using)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch; 