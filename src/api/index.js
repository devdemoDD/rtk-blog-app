import axios from 'axios';

const request = (token) =>
  axios.create({
    baseURL: process.env.API_SERVER,
    headers: { Authorization: token ? `Bearer ${token}` : '' },
  });

export default request;
