const DEV = process.env.NODE_ENV !== 'production';
const PORT = parseInt(process.env.PORT, 10) || 3000;
const API_URL = process.env.API_URL;
const GRAPHQL_APP_URL = '/graphql';
const REFRESH_TOKEN_KEY = 'refreshToken';

module.exports = {
  DEV,
  PORT,
  API_URL,
  GRAPHQL_APP_URL,
  REFRESH_TOKEN_KEY,
};
