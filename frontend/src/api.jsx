// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const registerUser = async (data) => api.post('/auth/register', data);
export const loginUser = async (data) => api.post('/auth/login', data);
export const fetchTasks = async () => api.get('/tareas');
export const createTask = async (data) => api.post('/tareas', data);
