export interface TransactionProps {
  id: number;
  user_id: number;
  wallet_id: number;
  category_id: number;
  value: number;
  favorite: boolean;
  description: string;
  date: string;
  type: 'income' | 'spent';
}
