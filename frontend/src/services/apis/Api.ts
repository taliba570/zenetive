import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzQ3MmE4OGJmYWI3MjQ2ODY2ODQ2OWQiLCJlbWFpbCI6InRhbGliYWxsYXVkZGluQGdtYWlsLmNvbSIsImlhdCI6MTczMjcxNzE5NywiZXhwIjoxNzM1MzA5MTk3fQ.oyTJnJnjpXfNniR_fHUJTXdaiiBYAty6uNWSzc7LytU',
  },
});

export default Api;