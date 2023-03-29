import axios from 'axios';

import { authLogin, authMe, authSignup } from './auth.service';

import {
  deleteTransaction,
  editTransaction,
  getOneTransactionById,
  getTransactions,
  saveTransaction,
} from './transaction.service';

import { deleteUser, editUser } from './user.service';

import {
  saveWallet,
  editWallet,
  deleteWallet,
  getWallets,
  getOneWalletById,
} from './wallet.service';

export const api = axios.create({
  baseURL: 'https://x8ki-letl-twmt.n7.xano.io/api:lAs0USpa',
});

export {
  saveWallet,
  editWallet,
  deleteWallet,
  getWallets,
  getOneWalletById,
  authLogin,
  authMe,
  authSignup,
  deleteTransaction,
  editTransaction,
  getOneTransactionById,
  getTransactions,
  saveTransaction,
  deleteUser,
  editUser,
};
