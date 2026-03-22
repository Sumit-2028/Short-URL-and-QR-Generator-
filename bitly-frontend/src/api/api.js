import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  || (import.meta.env.DEV ? 'http://localhost:8080' : window.location.origin);

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
