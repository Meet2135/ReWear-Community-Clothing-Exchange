import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '../../services/adminService';

// Async thunks
export const fetchAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminService.getUsers(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const fetchItems = createAsyncThunk(
  'admin/fetchItems',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminService.getItems(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch items');
    }
  }
);

export const fetchSwaps = createAsyncThunk(
  'admin/fetchSwaps',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminService.getSwaps(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch swaps');
    }
  }
);

export const approveItem = createAsyncThunk(
  'admin/approveItem',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await adminService.approveItem(itemId);
      return { itemId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to approve item');
    }
  }
);

export const rejectItem = createAsyncThunk(
  'admin/rejectItem',
  async ({ itemId, reason }, { rejectWithValue }) => {
    try {
      const response = await adminService.rejectItem(itemId, reason);
      return { itemId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reject item');
    }
  }
);

export const banUser = createAsyncThunk(
  'admin/banUser',
  async ({ userId, reason }, { rejectWithValue }) => {
    try {
      const response = await adminService.banUser(userId, reason);
      return { userId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to ban user');
    }
  }
);

export const unbanUser = createAsyncThunk(
  'admin/unbanUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await adminService.unbanUser(userId);
      return { userId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unban user');
    }
  }
);

const initialState = {
  stats: null,
  users: [],
  items: [],
  swaps: [],
  loading: false,
  error: null,
  pagination: {
    users: { page: 1, limit: 10, total: 0, pages: 0 },
    items: { page: 1, limit: 10, total: 0, pages: 0 },
    swaps: { page: 1, limit: 10, total: 0, pages: 0 }
  }
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearStats: (state) => {
      state.stats = null;
    },
    clearUsers: (state) => {
      state.users = [];
    },
    clearItems: (state) => {
      state.items = [];
    },
    clearSwaps: (state) => {
      state.swaps = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch stats
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination.users = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.pagination.items = action.payload.pagination;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch swaps
      .addCase(fetchSwaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSwaps.fulfilled, (state, action) => {
        state.loading = false;
        state.swaps = action.payload.swaps;
        state.pagination.swaps = action.payload.pagination;
      })
      .addCase(fetchSwaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Approve item
      .addCase(approveItem.fulfilled, (state, action) => {
        const { itemId } = action.payload;
        state.items = state.items.map(item => 
          item._id === itemId 
            ? { ...item, status: 'active' }
            : item
        );
      })
      
      // Reject item
      .addCase(rejectItem.fulfilled, (state, action) => {
        const { itemId } = action.payload;
        state.items = state.items.map(item => 
          item._id === itemId 
            ? { ...item, status: 'rejected' }
            : item
        );
      })
      
      // Ban user
      .addCase(banUser.fulfilled, (state, action) => {
        const { userId } = action.payload;
        state.users = state.users.map(user => 
          user._id === userId 
            ? { ...user, status: 'banned' }
            : user
        );
      })
      
      // Unban user
      .addCase(unbanUser.fulfilled, (state, action) => {
        const { userId } = action.payload;
        state.users = state.users.map(user => 
          user._id === userId 
            ? { ...user, status: 'active' }
            : user
        );
      });
  }
});

export const { clearError, clearStats, clearUsers, clearItems, clearSwaps } = adminSlice.actions;

export const selectAdminStats = (state) => state.admin.stats;
export const selectAdminUsers = (state) => state.admin.users;
export const selectAdminItems = (state) => state.admin.items;
export const selectAdminSwaps = (state) => state.admin.swaps;
export const selectAdminLoading = (state) => state.admin.loading;
export const selectAdminError = (state) => state.admin.error;
export const selectAdminPagination = (state) => state.admin.pagination;

export default adminSlice.reducer; 