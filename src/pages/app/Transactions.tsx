import React from 'react';

import { Description, Text, Select, Button } from '~/components/basics';

import { useAuth } from '~/context/AuthContext';

import { TransactionLine, TransactionModal } from '~/components/complexes';

import { Plus, Sliders } from 'phosphor-react';
import { CategoryEnum } from '~/enums';

export const Transactions = () => {
  const { transactions } = useAuth();

  const [addTransactionModalIsOpen, setAddTransactionModalIsOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<string>('default');
  const [filteredTransactions, setFilteredTransactions] = React.useState(transactions);

  React.useEffect(() => {
    setFilteredTransactions((old) => {
      if (filter === 'value') return [...old.sort((a, b) => b.value - a.value)];
      if (filter === 'category')
        return [
          ...old.sort((a, b) =>
            CategoryEnum[a.category_id] > CategoryEnum[b.category_id] ? 1 : -1,
          ),
        ];
      if (filter === 'date') return [...old.sort((a, b) => (a.date > b.date ? -1 : 1))];
      return [...old.sort((a, b) => b.id - a.id)];
    });
  }, [filter]);

  return (
    <div className='h-full w-full flex flex-col'>
      <div className='flex items-center justify-between'>
        <Button variant='add' onClick={() => setAddTransactionModalIsOpen(true)}>
          <Plus weight='bold' />
          <Text className='ml-2'>Adicionar transação</Text>
        </Button>
        <div className='flex items-center gap-4'>
          <Text className=''>Ordenar por </Text>
          <Select value={filter} onChange={({ target: { value } }) => setFilter(value)}>
            <option value='default'>Últimas transações</option>
            <option value='value'>Valor</option>
            <option value='category'>Categoria</option>
            <option value='date'>Data</option>
          </Select>
          <button className='flex gap-3 border border-1 rounded-full w-[6.25rem] justify-center'>
            Filtros <Sliders className='rotate-90 mt-1' />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-12 p-2 mt-4'>
        <Description className='col-span-3'>Descrição</Description>
        <Description className='col-span-1'>Valor</Description>
        <Description className='col-span-1'>Carteira</Description>
        <Description className='col-span-1'>Tipo</Description>
        <Description className='col-span-2'>Categoria</Description>
        <Description className='col-span-2'>Data</Description>
        <Description className='col-span-1'>Favorito</Description>
        <Description className='col-span-1'>Ver</Description>
      </div>
      <div className='flex-1 flex flex-col gap-2 mt-2 py-2 border-t border-b'>
        {filteredTransactions.map((t) => (
          <TransactionLine key={t.id} transaction={t} />
        ))}
      </div>
      {addTransactionModalIsOpen && (
        <TransactionModal closeTransactionModal={() => setAddTransactionModalIsOpen(false)} />
      )}
    </div>
  );
};
