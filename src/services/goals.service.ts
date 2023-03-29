import { api } from '.';

import { AxiosResponse } from 'axios';

import { GoalsProps } from '~/models';

export const getGoals = (user_id: number): Promise<AxiosResponse<GoalsProps[]>> => {
  const token = localStorage.getItem('authToken');

  return api.get('Goal', {
    params: {
      user_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOneGoalById = (id: number): Promise<AxiosResponse<GoalsProps>> => {
  const token = localStorage.getItem('authToken');

  return api.get(`goal/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

interface SaveGoalDTO {
  user_id: number;
  type: 'balance' | 'income' | 'spent';
  value: number;
}

export const saveGoal = ({
  user_id,
  type,
  value,
}: SaveGoalDTO): Promise<AxiosResponse<GoalsProps>> => {
  const token = localStorage.getItem('authToken');

  return api.post(
    'goal',
    {
      user_id,
      type,
      value,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

interface EditGoalDTO {
  user_id?: number;
  type?: 'balance' | 'income' | 'spent';
  value?: number;
}

export const editGoal = (
  id: number,
  { type, user_id, value }: EditGoalDTO,
): Promise<AxiosResponse<GoalsProps>> => {
  const token = localStorage.getItem('authToken');

  return api.post(
    `goal/${id}`,
    {
      user_id,
      type,
      value,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteGoal = (id: number): Promise<AxiosResponse<GoalsProps>> => {
  const token = localStorage.getItem('authToken');

  return api.delete(`goal/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
