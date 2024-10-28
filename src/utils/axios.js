import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-3-83-184-204.compute-1.amazonaws.com:8080/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    console.log('Current token:', token); // Debug log
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request config:', config); // Debug log
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized access, please login again');
      // Optionally redirect to login or handle unauthorized access
    }
    return Promise.reject(error);
  }
);

export default api;
