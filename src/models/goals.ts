export interface GoalsProps {
  id: number;
  user_id: number;
  type: 'balance' | 'income' | 'spent';
  value: number;
}
