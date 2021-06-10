import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export const useConnection = () => {
  const connection = axios.create({
    baseURL: process.env.API_URL || 'https://localhost:3001',
  });

  return connection;
};
