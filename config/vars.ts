import dotenv from 'dotenv';

dotenv.config();

export const DEV = process.env.NODE_ENV !== 'production';
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
export const API_URL = process.env.API_URL;
export const GRAPHQL_APP_URL = '/graphql';
