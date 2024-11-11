import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
};

export const services = {
  create: (data) => api.post('/services', data),
  getAll: () => api.get('/services'),
};

export const appointments = {
  create: (data) => api.post('/appointments', data),
  getAll: () => api.get('/appointments'),
};

export const diagnosis = {
  create: (data) => api.post('/diagnosis', data),
};

export default api;