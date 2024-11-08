export default () => ({
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION || '30d',
  },
  api: {
    port: parseInt(process.env.API_PORT, 10) || 3000,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    whitelistedIPs: [
      'http://localhost:9000',
      'https://master.d3muok6acru34g.amplifyapp.com',
      'http://13.49.243.204',
      'http://localhost:3000',
    ],
  },
});
