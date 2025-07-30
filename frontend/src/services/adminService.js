import api from './api';

export const adminService = {
  // Dashboard stats
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // User management
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  getUserDetails: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  banUser: async (userId, reason) => {
    const response = await api.put(`/admin/users/${userId}/ban`, { reason });
    return response.data;
  },

  unbanUser: async (userId) => {
    const response = await api.put(`/admin/users/${userId}/unban`);
    return response.data;
  },

  // Item moderation
  getItems: async (params = {}) => {
    const response = await api.get('/admin/items', { params });
    return response.data;
  },

  approveItem: async (itemId) => {
    const response = await api.put(`/admin/items/${itemId}/approve`);
    return response.data;
  },

  rejectItem: async (itemId, reason) => {
    const response = await api.put(`/admin/items/${itemId}/reject`, { reason });
    return response.data;
  },

  removeItem: async (itemId) => {
    const response = await api.delete(`/admin/items/${itemId}`);
    return response.data;
  },

  // Swap management
  getSwaps: async (params = {}) => {
    const response = await api.get('/admin/swaps', { params });
    return response.data;
  },

  // Analytics
  getAnalytics: async (period = '7d') => {
    const response = await api.get('/admin/analytics', { params: { period } });
    return response.data;
  }
};

export default adminService; 