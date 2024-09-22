import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://13.49.243.204:3000/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU0NWViOTFjYTA2YjgxZDEwZTE5MWQiLCJlbWFpbCI6InRhbGliYWxsYXVkZGluQGdtYWlsLmNvbSIsImlhdCI6MTcyNjg3NjU2MiwiZXhwIjoxNzI5NDY4NTYyfQ.bW4rFP_pmjpqkwgS4OcHlRS2VSxqcUu9QuNIyoX3f6U',
  },
});

export default Api;