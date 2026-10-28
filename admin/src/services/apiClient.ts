import axios from 'axios';
import { API_BASE_URL } from "@/config/constants";
// 1. Create a custom instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 2. Add the request interceptor (Your Middleware)
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve your token (from sessionStorage, localStorage, or cookies)
    const sessionToken = sessionStorage.getItem('adminToken');

    // If the token exists, inject it into the Authorization header
    if (sessionToken) {
      config.headers['Authorization'] = `Bearer ${sessionToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// 3. Optional: Add a response interceptor to handle session expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the server returns a 401 Unauthorized, your session token might be expired
    if (error.response && error.response.status === 401) {
      console.warn('Session expired. Redirecting to login...');
      sessionStorage.removeItem('session_token');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default apiClient;
