import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/items', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch items');
    }
  }
);

export const fetchFeaturedItems = createAsyncThunk(
  'items/fetchFeaturedItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/items/featured');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured items');
    }
  }
);

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/items/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch item');
    }
  }
);

export const createItem = createAsyncThunk(
  'items/createItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await api.post('/items', itemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create item');
    }
  }
);

// Initial state
const initialState = {
  items: [],
  featuredItems: [],
  currentItem: null,
  isLoading: false,
  error: null,
  filters: {
    category: '',
    size: '',
    condition: '',
    minPoints: '',
    maxPoints: '',
    search: '',
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    hasMore: true,
  },
};

// Items slice
const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    toggleLike: (state, action) => {
      const { itemId, userId } = action.payload;
      const item = state.items.find(item => item._id === itemId);
      if (item) {
        const likeIndex = item.likes.indexOf(userId);
        if (likeIndex > -1) {
          item.likes.splice(likeIndex, 1);
        } else {
          item.likes.push(userId);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.page === 1) {
          state.items = action.payload.data;
        } else {
          state.items = [...state.items, ...action.payload.data];
        }
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          hasMore: action.payload.hasMore,
        };
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch featured items
      .addCase(fetchFeaturedItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeaturedItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredItems = action.payload;
      })
      .addCase(fetchFeaturedItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch item by ID
      .addCase(fetchItemById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Create item
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { 
  clearError, 
  clearCurrentItem, 
  setFilters, 
  clearFilters, 
  setPage, 
  toggleLike 
} = itemSlice.actions;

// Export selectors
export const selectItems = (state) => state.items.items;
export const selectFeaturedItems = (state) => state.items.featuredItems;
export const selectCurrentItem = (state) => state.items.currentItem;
export const selectIsLoading = (state) => state.items.isLoading;
export const selectError = (state) => state.items.error;
export const selectFilters = (state) => state.items.filters;
export const selectPagination = (state) => state.items.pagination;

export default itemSlice.reducer; 