import { Description, Text } from '~/components/basics';

import { useAuth } from '~/context/AuthContext';

import {
  DashboardInfoBox,
  DashboardLineChart,
  RankingBox,
  TransactionLine,
} from '~/components/complexes';

import { Wallet, TrendUp, TrendDown } from 'phosphor-react';

export const Dashboard = () => {
  const { transactions } = useAuth();
  const reversedArray = transactions.slice(-10).reverse();
  let receitas = 0;
  let despesas = 0;

  for (let i = 0; i < transactions.length; i++) {
    transactions[i].type === 'income'
      ? (receitas += transactions[i].value)
      : (despesas += transactions[i].value);
  }

  return (
    <div className='h-full w-full flex flex-col gap-5'>
      <div className='h-1/2 flex-1 flex items-center gap-5'>
        <div className='h-full w-full xl:w-2/3 flex flex-col gap-5'>
          <div className='w-full grid grid-cols-3 gap-5'>
            <DashboardInfoBox
              description='Saldo'
              value={(receitas - despesas).toLocaleString('pt-BR')}
              icon={<Wallet weight='fill' color='#003060' />}
              iconContainerColor='bg-[#ddddff]'
            />
            <DashboardInfoBox
              description='Receitas'
              value={receitas.toLocaleString('pt-BR')}
              icon={<TrendUp color='#009000' />}
              iconContainerColor='bg-[#ddffdd]'
            />
            <DashboardInfoBox
              description='Despesas'
              value={despesas.toLocaleString('pt-BR')}
              icon={<TrendDown color='#FF2020' />}
              iconContainerColor='bg-[#ffdddd]'
            />
          </div>
          <DashboardLineChart />
        </div>
        <div className='h-full w-1/3 hidden xl:block'>
          <RankingBox />
        </div>
      </div>
      <div className='h-1/2 bg-white rounded p-5 shadow'>
        <Text large className='py-2'>
          Últimas transações
        </Text>
        <div className='grid grid-cols-12 py-2 px-4'>
          <Description className='col-span-3'>Descrição</Description>
          <Description className='col-span-1'>Preço</Description>
          <Description className='col-span-1'>Carteira</Description>
          <Description className='col-span-1'>Tipo</Description>
          <Description className='col-span-2'>Categoria</Description>
          <Description className='col-span-2'>Data</Description>
          <Description className='col-span-1'>Favorito</Description>
          <Description className='col-span-1'>Opções</Description>
        </div>
        <div className='h-[calc(100%-5rem)] overflow-y-auto bg-[#f5f5f5]'>
          <div className='flex-1 flex flex-col gap-2 p-1 border-t border-b'>
            {reversedArray.map((t) => (
              <TransactionLine key={t.id} transaction={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
