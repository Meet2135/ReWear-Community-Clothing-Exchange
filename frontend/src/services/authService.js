import api from './api';

const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response;
  },
};

export default authService; 