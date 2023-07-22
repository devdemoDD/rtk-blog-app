import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import authSlice from './slices/auth';
import postsSlice from './slices/posts';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  posts: postsSlice.reducer,
});

export const configure = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  });
