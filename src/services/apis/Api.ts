import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU0NWViOTFjYTA2YjgxZDEwZTE5MWQiLCJlbWFpbCI6InRhbGliYWxsYXVkZGluQGdtYWlsLmNvbSIsImlhdCI6MTcyNjcwODQwOSwiZXhwIjoxNzI2Nzk0ODA5fQ.gMxbXSJ7TdqJWmhaKCbtCrvqJHIqUt6rMdJ0LCpTs5Y',
  },
});

export default Api;