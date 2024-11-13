// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor para agregar el token en cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Funciones para realizar las solicitudes
export const registerUser = async (data) => api.post('/auth/register', data);
export const loginUser = async (data) => api.post('/auth/login', data);
export const getUser = async () => api.get('/auth/profile');
export const fetchTasks = async () => api.get('/tareas');
export const createTask = async (data) => api.post('/tareas', data);

export default api;
