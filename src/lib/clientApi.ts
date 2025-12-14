import axios from 'axios';

const clientApi = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export default clientApi;
