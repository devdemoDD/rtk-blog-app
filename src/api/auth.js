import request from '../api';

export const signup = (data) => request().post('/signup', data);
export const login = (data) => request().post('/login', data);
