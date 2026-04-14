// Services layer — all API calls go through this file

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor for consistent error shape
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const fetchTodos = () => apiClient.get('/todos');
export const fetchUsers = () => apiClient.get('/users');
