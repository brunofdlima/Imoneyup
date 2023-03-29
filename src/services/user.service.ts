import { api } from '.';

import { AxiosResponse } from 'axios';

import { UserProps } from '~/models';

interface EditUserDTO {
  name?: string;
  email?: string;
  password?: string;
}

export const editUser = (
  id: number,
  { name, email, password }: EditUserDTO,
): Promise<AxiosResponse<UserProps>> => {
  const token = localStorage.getItem('authToken');

  return api.post(
    `user/${id}`,
    {
      name,
      email,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteUser = (id: number): Promise<AxiosResponse<UserProps>> => {
  const token = localStorage.getItem('authToken');

  return api.delete(`user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
