import request from '../api';

export const getPosts = () => request().get('/posts');
// export const getPost = (id) => request().get(`/posts${id}`);
export const addPost = (data) => request().post('/posts', data);
export const editPost = ({ id, data }) => request().patch(`/posts/${id}`, data);
export const deletePost = (id) => request().delete(`/posts/${id}`);
