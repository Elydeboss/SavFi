import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // Vite proxy will forward this
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
