import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../api/auth';

export const login = createAsyncThunk('auth/login', async (data) => {
  const response = await authAPI.login(data);
  return response.data.user;
});

export const signup = createAsyncThunk('auth/signup', async (data) => {
  const response = await authAPI.signup(data);
  return response.data;
});
