import { api } from '.';

import { AxiosResponse } from 'axios';

import { WalletProps } from '~/models';

export const getWallets = (user_id: number): Promise<AxiosResponse<WalletProps[]>> => {
  const token = localStorage.getItem('authToken');

  return api.get('wallet', {
    params: {
      user_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOneWalletById = (id: number): Promise<AxiosResponse<WalletProps>> => {
  const token = localStorage.getItem('authToken');

  return api.get(`wallet/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveWallet = (
  user_id: number,
  description: string,
): Promise<AxiosResponse<WalletProps>> => {
  const token = localStorage.getItem('authToken');

  return api.post(
    'wallet',
    {
      user_id,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const editWallet = (
  id: number,
  user_id: number,
  description: string,
): Promise<AxiosResponse<WalletProps>> => {
  const token = localStorage.getItem('authToken');

  return api.post(
    `wallet/${id}`,
    {
      user_id,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteWallet = (id: number): Promise<AxiosResponse<WalletProps>> => {
  const token = localStorage.getItem('authToken');

  return api.delete(`wallet/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
