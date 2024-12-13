import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { generateHmac } from '../../utils/request-signature';

const Api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRhMDQ2NGM1MWZhNGU4ODI3OGFmNjgiLCJlbWFpbCI6InRhbGliYWxsYXVkZGluQGdtYWlsLmNvbSIsImlzcyI6IlplbmV0aXZlIiwiYXVkIjoiWmVuZXRpdmVKV1QiLCJpYXQiOjE3MzQxMDc1NTAsImV4cCI6MTczNjY5OTU1MH0.2lCJqmA6jI9LEdVxIcKxM1JkAweHUpWFBnUtph8lNVw',
  },
});

Api.interceptors.request.use(config => {
  const body = config.data || {};
  const url = config?.url;
  const nonce = uuidv4();
  const timestamp = new Date()?.getTime(); 

  const messageParams = {url,body,nonce,timestamp};
  const message = JSON.stringify(messageParams);
  config.headers['x-signature'] = generateHmac(message);
  config.headers['x-request-nonce'] = nonce;
  config.headers['x-timestamp'] = timestamp;
  config.headers['x-client-id'] = 'web-env';

  return config;
})

export default Api;