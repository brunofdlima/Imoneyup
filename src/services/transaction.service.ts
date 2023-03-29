import { api } from '.';

import { AxiosResponse } from 'axios';

import { TransactionProps } from '~/models';

export const getTransactions = (user_id: number): Promise<AxiosResponse<TransactionProps[]>> => {
  const token = localStorage.getItem('authToken');

  return api.get('transaction', {
    params: {
      user_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOneTransactionById = (id: number): Promise<AxiosResponse<TransactionProps>> => {
  const token = localStorage.getItem('authToken');

  return api.get(`transaction/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

interface SaveTransactionDTO {
  user_id: number;
  wallet_id: number;
  category_id: number;
  description: string;
  value: number;
  date: string;
  favorite: boolean;
  type: 'income' | 'spent';
}

export const saveTransaction = ({
  user_id,
  wallet_id,
  category_id,
  description,
  value,
  date,
  favorite,
  type,
}: SaveTransactionDTO): Promise<AxiosResponse<TransactionProps>> => {
  const token = localStorage.getItem('authToken');

  return api.post(
    'transaction',
    {
      user_id,
      wallet_id,
      category_id,
      description,
      value,
      date,
      favorite,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

interface EditTransactionDTO {
  user_id?: number;
  wallet_id?: number;
  category_id?: number;
  description?: string;
  value?: number;
  date?: string;
  favorite?: boolean;
  type?: 'income' | 'spent';
}

export const editTransaction = (
  id: number,
  { category_id, date, description, favorite, type, user_id, value, wallet_id }: EditTransactionDTO,
): Promise<AxiosResponse<TransactionProps>> => {
  const token = localStorage.getItem('authToken');

  return api.post(
    `transaction/${id}`,
    {
      user_id,
      category_id,
      date,
      description,
      favorite,
      type,
      value,
      wallet_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteTransaction = (id: number): Promise<AxiosResponse<TransactionProps>> => {
  const token = localStorage.getItem('authToken');

  return api.delete(`transaction/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
