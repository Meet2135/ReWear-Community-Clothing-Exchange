import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  sidebarOpen: false,
  theme: 'light',
  notifications: [],
  loadingStates: {},
};

// UI slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setLoadingState: (state, action) => {
      const { key, isLoading } = action.payload;
      state.loadingStates[key] = isLoading;
    },
    clearLoadingState: (state, action) => {
      delete state.loadingStates[action.payload];
    },
  },
});

// Export actions
export const {
  toggleSidebar,
  setSidebarOpen,
  toggleTheme,
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoadingState,
  clearLoadingState,
} = uiSlice.actions;

// Export selectors
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectTheme = (state) => state.ui.theme;
export const selectNotifications = (state) => state.ui.notifications;
export const selectLoadingStates = (state) => state.ui.loadingStates;
export const selectIsLoading = (key) => (state) => state.ui.loadingStates[key] || false;

export default uiSlice.reducer; 