import { createAsyncThunk } from '@reduxjs/toolkit';
import * as postsAPI from '../../api/posts';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await postsAPI.getPosts();
  return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (data) => {
  const response = await postsAPI.addPost(data);
  return response.data;
});

export const editPost = createAsyncThunk('posts/editPost', async (data) => {
  const response = await postsAPI.editPost(data);
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const response = await postsAPI.deletePost(id);
  return response.data;
});
