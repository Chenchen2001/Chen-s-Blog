import axios from 'axios';

const request = axios.create({
  baseURL: 'https://blog.chenchen.ip-ddns.com', // 后端地址
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default request;
