import axios from 'axios';
import { API_CONFIG } from '../config/api';

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error cases here
    return Promise.reject(error);
  }
);

export default apiClient;