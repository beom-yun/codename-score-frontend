import axios from 'axios';
import Cookie from 'js-cookie';
import { ICreateRegularGameDate, IEditMyPage, IPasswordLoginVariables } from './types';
import { QueryFunctionContext } from '@tanstack/react-query';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  withCredentials: true,
});

export const getRegularGameDates = () => instance.get('regular-games/').then(response => response.data);

export const getRegularGameDate = ({ queryKey }: QueryFunctionContext) => {
  const [_, datePk] = queryKey;
  return instance.get(`regular-games/${datePk}`).then(response => response.data);
};

export const getUsers = () => instance.get('users/').then(response => response.data);

export const getMe = () => instance.get('users/me/').then(response => response.data);

export const logOut = () =>
  instance
    .post('users/log-out/', null, {
      headers: { 'X-CSRFToken': Cookie.get('csrftoken') } || '',
    })
    .then(response => response.data);

export const passwordLogin = ({ username, password }: IPasswordLoginVariables) =>
  instance
    .post('users/log-in/', { username, password }, { headers: { 'X-CSRFToken': Cookie.get('csrftoken') } || '' })
    .then(response => response.data);

export const kakaoLogin = (code: string) =>
  instance
    .post('users/kakao/', { code }, { headers: { 'X-CSRFToken': Cookie.get('csrftoken') } || '' })
    .then(response => response.status);

export const getRegularGameScore = ({ queryKey }: QueryFunctionContext) => {
  const [_, datePk] = queryKey;
  return instance.get(`regular-games/${datePk}/scores/`).then(response => response.data);
};

export const getMyRecords = () => instance.get('regular-games/me/').then(response => response.data);

export const editMyPage = (variables: IEditMyPage) =>
  instance
    .put('users/me/', variables, { headers: { 'X-CSRFToken': Cookie.get('csrftoken') } || '' })
    .then(response => response.data);

export const createRegularGameDate = ({ round_of_game, date, lanes }: ICreateRegularGameDate) =>
  instance
    .post(
      'regular-games/',
      { round_of_game, date, lanes },
      { headers: { 'X-CSRFToken': Cookie.get('csrftoken') } || '' }
    )
    .then(response => response.data);

export const createRegularGameScore = ({ date_pk, bowler_pk }: { date_pk: number; bowler_pk: number }) =>
  instance
    .post(
      `regular-games/${date_pk}/scores/`,
      { bowler: bowler_pk },
      { headers: { 'X-CSRFToken': Cookie.get('csrftoken') } || '' }
    )
    .then(response => response.data);
