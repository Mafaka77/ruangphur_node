import axios from 'axios';

// Admin API base URL
const adminApi = axios.create({
  baseURL: 'http://localhost:5001/api/admin', // Admin API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add Authorization Header if Token Exists
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// User API base URL
const userApi = axios.create({
  baseURL: 'http://localhost:5001/api/user', // User API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add Authorization Header if Token Exists
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export { adminApi, userApi };
