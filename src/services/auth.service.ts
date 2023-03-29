import { api } from '.';

import { AxiosResponse } from 'axios';

import { UserProps } from '~/models';

export const authLogin = (
  email: string,
  password: string,
): Promise<AxiosResponse<{ authToken: string }>> => {
  return api.post('/auth/login', {
    email,
    password,
  });
};

export const authMe = (): Promise<AxiosResponse<UserProps>> => {
  const token = localStorage.getItem('authToken');

  return api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authSignup = (
  name: string,
  email: string,
  password: string,
): Promise<AxiosResponse<{ authToken: string }>> => {
  return api.post('/auth/signup', {
    name,
    email,
    password,
  });
};
