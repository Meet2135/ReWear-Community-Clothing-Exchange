import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Handle 401 Unauthorized
    if (response?.status === 401) {
      localStorage.removeItem('token');
      store.dispatch(logout());
      window.location.href = '/login';
    }
    
    // Handle 403 Forbidden
    if (response?.status === 403) {
      console.error('Access forbidden');
    }
    
    // Handle 500 Server Error
    if (response?.status === 500) {
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    updateProfile: '/auth/profile',
  },
  
  // Items
  items: {
    getAll: '/items',
    getById: (id) => `/items/${id}`,
    create: '/items',
    update: (id) => `/items/${id}`,
    delete: (id) => `/items/${id}`,
    search: '/items/search',
    featured: '/items/featured',
    userItems: '/items/user',
    like: (id) => `/items/${id}/like`,
    view: (id) => `/items/${id}/view`,
  },
  
  // Swaps
  swaps: {
    getAll: '/swaps',
    getById: (id) => `/swaps/${id}`,
    create: '/swaps',
    update: (id) => `/swaps/${id}`,
    delete: (id) => `/swaps/${id}`,
    userSwaps: '/swaps/user',
    pending: '/swaps/pending',
    accept: (id) => `/swaps/${id}/accept`,
    reject: (id) => `/swaps/${id}/reject`,
    complete: (id) => `/swaps/${id}/complete`,
  },
  
  // Users
  users: {
    getAll: '/users',
    getById: (id) => `/users/${id}`,
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
    stats: (id) => `/users/${id}/stats`,
    items: (id) => `/users/${id}/items`,
  },
  
  // Admin
  admin: {
    dashboard: '/admin/dashboard',
    items: '/admin/items',
    users: '/admin/users',
    approveItem: (id) => `/admin/items/${id}/approve`,
    rejectItem: (id) => `/admin/items/${id}/reject`,
    featureItem: (id) => `/admin/items/${id}/feature`,
    removeItem: (id) => `/admin/items/${id}/remove`,
    banUser: (id) => `/admin/users/${id}/ban`,
    unbanUser: (id) => `/admin/users/${id}/unban`,
  },
  
  // Upload
  upload: {
    image: '/upload/image',
    multiple: '/upload/multiple',
  },
};

// Helper functions
export const apiHelper = {
  // Handle API errors
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      return error.response.data.message || 'An error occurred';
    } else if (error.request) {
      // Request was made but no response received
      return 'Network error. Please check your connection.';
    } else {
      // Something else happened
      return error.message || 'An unexpected error occurred';
    }
  },
  
  // Create query string from object
  createQueryString: (params) => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        searchParams.append(key, params[key]);
      }
    });
    return searchParams.toString();
  },
  
  // Format date for API
  formatDate: (date) => {
    return new Date(date).toISOString();
  },
  
  // Validate file size
  validateFileSize: (file, maxSize = 5 * 1024 * 1024) => {
    return file.size <= maxSize;
  },
  
  // Validate file type
  validateFileType: (file, allowedTypes = ['image/jpeg', 'image/png', 'image/webp']) => {
    return allowedTypes.includes(file.type);
  },
};

export default api; 