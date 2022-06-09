export default () => ({
  env: process.env.NODE_ENV || 'development',
  port: 3000,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  logger: {
    level: 'debug',
    log: {
      requests: 'false',
      queries: 'true',
    },
  },
  JWT: {
    secretKey: process.env.JWT_SECRET,
  },
  omdbapi: {
    key: process.env.OMBD_API_KEY,
    api: process.env.OMBD_API,
  },
});
