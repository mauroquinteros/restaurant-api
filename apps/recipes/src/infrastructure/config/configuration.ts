export const configuration = () => ({
  environment: process.env.NODE_ENV,
  server: {
    port: parseInt(process.env.SERVER_PORT, 10),
  },
  database: {
    uri: process.env.MONGODB_URI,
  },
});
