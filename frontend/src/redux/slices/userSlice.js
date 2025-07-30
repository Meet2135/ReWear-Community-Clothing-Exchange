import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const fetchUserStats = createAsyncThunk(
  'user/fetchUserStats',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}/stats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user stats');
    }
  }
);

export const fetchUserItems = createAsyncThunk(
  'user/fetchUserItems',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}/items`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user items');
    }
  }
);

// Initial state
const initialState = {
  currentUser: null,
  userStats: null,
  userItems: [],
  isLoading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    updateUserPoints: (state, action) => {
      if (state.currentUser) {
        state.currentUser.points = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch user stats
      .addCase(fetchUserStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userStats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch user items
      .addCase(fetchUserItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userItems = action.payload;
      })
      .addCase(fetchUserItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearError, clearCurrentUser, updateUserPoints } = userSlice.actions;

// Export selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUserStats = (state) => state.user.userStats;
export const selectUserItems = (state) => state.user.userItems;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer; 