import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { generateHmac } from '../../utils/request-signature';

const Api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzQ3MmE4OGJmYWI3MjQ2ODY2ODQ2OWQiLCJlbWFpbCI6InRhbGliYWxsYXVkZGluQGdtYWlsLmNvbSIsImlhdCI6MTczMjcxNzE5NywiZXhwIjoxNzM1MzA5MTk3fQ.oyTJnJnjpXfNniR_fHUJTXdaiiBYAty6uNWSzc7LytU',
  },
});

Api.interceptors.request.use(config => {
  const body = config.data || [];
  const url = config?.url;
  const nonce = uuidv4();
  const timestamp = new Date()?.getTime();

  const messageParams = { url, body, nonce, timestamp };
  const message = JSON.stringify(messageParams);

  config.headers['x-signature'] = generateHmac(message);
  config.headers['x-request-nonce'] = nonce;
  config.headers['x-timestamp'] = timestamp;
  config.headers['x-client-id'] = process.env.SIGNATURE_CLIENT_ID;

  return config;
})

export default Api;