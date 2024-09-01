export const configuration = () => ({
  environment: process.env.NODE_ENV,
  server: {
    port: parseInt(process.env.SERVER_PORT, 10),
  },
  orders: {
    host: process.env.ORDERS_HOST,
    port: parseInt(process.env.ORDERS_PORT, 10),
  },
  market: {
    host: process.env.MARKET_HOST,
    port: parseInt(process.env.MARKET_PORT, 10),
  },
  database: {
    uri: process.env.MONGODB_URI,
  },
});
