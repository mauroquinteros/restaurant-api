export const configuration = () => ({
  environment: process.env.NODE_ENV,
  server: {
    port: parseInt(process.env.SERVER_PORT, 10),
  },
  gateway: {
    host: process.env.GATEWAY_HOST,
    port: parseInt(process.env.GATEWAY_PORT, 10),
  },
  recipes: {
    host: process.env.RECIPES_HOST,
    port: parseInt(process.env.RECIPES_PORT, 10),
  },
  database: {
    uri: process.env.MONGODB_URI,
  },
});
