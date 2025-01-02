import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  uri: process.env.MONGO_URI,
}));
