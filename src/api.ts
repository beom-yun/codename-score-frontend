import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'js-cookie';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  withCredentials: true,
});

export const getRegularGameDates = () =>
  instance.get('scores/').then(response => response.data);

export const getRegularGame = ({ queryKey }: QueryFunctionContext) => {
  const [_, regularGamePk] = queryKey;
  return instance
    .get(`scores/${regularGamePk}/`)
    .then(response => response.data);
};

export const getMe = () =>
  instance.get('users/me/').then(response => response.data);

export const logout = () =>
  instance
    .post('users/logout/', null, {
      headers: { 'X-CSRFToken': Cookie.get('csrftoken') || '' },
    })
    .then(response => response.data);

export interface ILoginProps {
  username: string;
  password: string;
}

export interface ILoginSuccess {
  ok: string;
}

export interface ILoginError {
  error: string;
}

export const login = ({ username, password }: ILoginProps) =>
  instance
    .post(
      '/users/login/',
      { username, password },
      { headers: { 'X-CSRFToken': Cookie.get('csrftoken') || '' } }
    )
    .then(response => response.data);
