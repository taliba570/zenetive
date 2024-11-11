import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmU0NWViOTFjYTA2YjgxZDEwZTE5MWQiLCJlbWFpbCI6InRhbGliYWxsYXVkZGluQGdtYWlsLmNvbSIsImlhdCI6MTcyOTU5NjEyNCwiZXhwIjoxNzMyMTg4MTI0fQ.7AZ7-RCFScjWD9pknrxQSP31W5-nd6NnV3tcMmADLsI',
  },
});

export default Api;