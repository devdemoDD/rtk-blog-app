import { createSlice } from '@reduxjs/toolkit';
import * as auth from '../actions/auth';

const initialState = {
  isLoggedIn: false,
  user: null, // { id, email, nickname, type(0 admin / 1 user)}
  error: null,
  message: '',
};

const isPendingAction = (action) => action.type.endsWith('pending');
const isRejectedAction = (action) => action.type.endsWith('rejected');

// reducers : 동기적인 작업위한 공간
// extraReducers : 비동기적인 작업을 위한 공간
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // auth/logout 라는 이름의 액션이 자동생성
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      state.message = '';
    },
    clearMessage(state) {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(auth.signup.fulfilled, (state, action) => {
        state.message = 'Created';
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.isLoggedIn = false;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.error = action.error;
      })
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

export default authSlice;
