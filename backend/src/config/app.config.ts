import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.API_PORT, 10),
  cors: process.env.CORS,
  methods: process.env.METHODS,
  algorithm: process.env.ENCRYPTION_ALGORITHM,
  requestExpiry: process.env.REQUEST_SIGNATURE_EXPIRY,
  clientId: process.env.SHARED_SECRET_KEY,
}));
