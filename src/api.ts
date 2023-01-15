import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
});

export const getRegularGame = ({ queryKey }: QueryFunctionContext) => {
  const [_, regularGamePk] = queryKey;
  return instance.get(`scores/${regularGamePk}/`).then(response => response.data);
};