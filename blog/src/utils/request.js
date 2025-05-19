import axios from 'axios';

const request = axios.create({
  baseURL: '<Your Request Backend URL here>', 
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default request;
