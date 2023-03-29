import React from 'react';

import { useAuth } from '~/context/AuthContext';

import { Button, Text } from '../basics';

import { CategoryEnum } from '~/enums';

import { Eye } from 'phosphor-react';

import { TransactionModal } from '.';

import { TransactionProps } from '~/models';

interface Props {
  transaction: TransactionProps;
}

type TransactionLineProps = JSX.IntrinsicElements['div'] & Props;

export const TransactionLine: React.FC<TransactionLineProps> = ({ transaction, ...rest }) => {
  const { description, value, category_id, wallet_id, type, date, favorite } = transaction;

  const { wallets } = useAuth();

  const [addTransactionModalIsOpen, setAddTransactionModalIsOpen] = React.useState(false);

  return (
    <div
      {...rest}
      className='w-full grid grid-cols-12 bg-white border border-[#0050AA] rounded p-3 hover:-translate-y-1 transition hover:shadow-lg'
    >
      <Text className='col-span-3 flex items-center'>{description}</Text>
      <Text className='col-span-1 flex items-center'>R$ {value}</Text>
      <Text className='col-span-1 flex items-center'>
        {wallets.find((w) => w.id === wallet_id)?.description}
      </Text>
      <Text className='col-span-1 flex items-center'>{type === 'income' ? 'Renda' : 'Gasto'}</Text>
      <Text className='col-span-2 flex items-center'>{CategoryEnum[`${category_id}`]}</Text>
      <Text className='col-span-2 flex items-center'>{date}</Text>
      <Text className='col-span-1 flex items-center'>{favorite ? 'Sim' : 'Não'}</Text>
      <div className='col-span-1'>
        <Button
          className='rounded p-1 bg-[#eeeeee] hover:bg-blue-50 hover:text-blue-700'
          onClick={() => setAddTransactionModalIsOpen(true)}
        >
          <Eye fontSize={20} />
        </Button>
      </div>
      {addTransactionModalIsOpen && (
        <TransactionModal
          transaction={transaction}
          closeTransactionModal={() => setAddTransactionModalIsOpen(false)}
        />
      )}
    </div>
  );
};
