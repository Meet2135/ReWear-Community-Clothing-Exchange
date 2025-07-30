import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchSwaps = createAsyncThunk(
  'swaps/fetchSwaps',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/swaps');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch swaps');
    }
  }
);

export const fetchUserSwaps = createAsyncThunk(
  'swaps/fetchUserSwaps',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/swaps/user');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user swaps');
    }
  }
);

export const createSwap = createAsyncThunk(
  'swaps/createSwap',
  async (swapData, { rejectWithValue }) => {
    try {
      const response = await api.post('/swaps', swapData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create swap');
    }
  }
);

export const acceptSwap = createAsyncThunk(
  'swaps/acceptSwap',
  async (swapId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/swaps/${swapId}/accept`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to accept swap');
    }
  }
);

export const rejectSwap = createAsyncThunk(
  'swaps/rejectSwap',
  async (swapId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/swaps/${swapId}/reject`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reject swap');
    }
  }
);

// Initial state
const initialState = {
  swaps: [],
  userSwaps: [],
  isLoading: false,
  error: null,
};

// Swaps slice
const swapSlice = createSlice({
  name: 'swaps',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addSwap: (state, action) => {
      state.swaps.unshift(action.payload);
    },
    updateSwapStatus: (state, action) => {
      const { swapId, status } = action.payload;
      const swap = state.swaps.find(s => s._id === swapId);
      if (swap) {
        swap.status = status;
      }
      const userSwap = state.userSwaps.find(s => s._id === swapId);
      if (userSwap) {
        userSwap.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch swaps
      .addCase(fetchSwaps.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSwaps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.swaps = action.payload;
      })
      .addCase(fetchSwaps.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch user swaps
      .addCase(fetchUserSwaps.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserSwaps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userSwaps = action.payload;
      })
      .addCase(fetchUserSwaps.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Create swap
      .addCase(createSwap.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.swaps.unshift(action.payload);
      })
      .addCase(createSwap.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Accept swap
      .addCase(acceptSwap.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(acceptSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        const swap = state.swaps.find(s => s._id === action.payload._id);
        if (swap) {
          swap.status = 'accepted';
        }
      })
      .addCase(acceptSwap.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Reject swap
      .addCase(rejectSwap.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(rejectSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        const swap = state.swaps.find(s => s._id === action.payload._id);
        if (swap) {
          swap.status = 'rejected';
        }
      })
      .addCase(rejectSwap.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearError, addSwap, updateSwapStatus } = swapSlice.actions;

// Export selectors
export const selectSwaps = (state) => state.swaps.swaps;
export const selectUserSwaps = (state) => state.swaps.userSwaps;
export const selectIsLoading = (state) => state.swaps.isLoading;
export const selectError = (state) => state.swaps.error;

export default swapSlice.reducer; 