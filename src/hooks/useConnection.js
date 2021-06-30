import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export const useConnection = () => {
  const connection = axios.create({
    // baseURL: 'https://incident-identification-api.herokuapp.com',
    baseURL: 'http://localhost:3003',
  });

  return connection;
};
