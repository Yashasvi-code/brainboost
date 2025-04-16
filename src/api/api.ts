import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Request interceptor
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    API.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    API.post('/auth/login', data),
};

export const quizAPI = {
  submitResults: (data: { score: number; total: number }) =>
    API.post('/quiz', data),
  getHistory: () => API.get('/quiz'),
};

export const userAPI = {
  getProfile: () => API.get('/users/me'),
  updateProgress: (data: { experience: number; streak: number }) =>
    API.patch('/users/progress', data),
};