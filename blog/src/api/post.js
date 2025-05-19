import request from '../utils/request';

export const getPosts = () => request.get('/posts');
export const getPostById = (id) => request.get(`/posts/${id}`);
export const createPost = (data) => request.post('/posts', data);
export const updatePost = (id, data) => request.put(`/posts/${id}`, data);
export const deletePost = (id) => request.delete(`/posts/${id}`);
