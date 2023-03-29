import { Text } from '~/components/basics';

import { Medal } from 'phosphor-react';
import { RankingLine } from './RankingLine';

import { useAuth } from '~/context/AuthContext';

export const RankingBox = () => {
  const { transactions } = useAuth();
  return (
    <div className='h-full w-full flex flex-col rounded shadow bg-white'>
      <div className='h-fit w-full flex items-center justify-center p-4 bg-[#003060] text-white rounded-t'>
        <Medal fontSize={24} />
        <Text className='text-lg text-center mx-6'>Ranking de despesas</Text>
        <Medal fontSize={24} />
      </div>
      <div className='grid grid-cols-3 p-2'>
        <Text className='px-3'>Descrição</Text>
        <Text className='px-2'>Valor</Text>
        <Text className='px-9'>Data</Text>
      </div>
      <div className='p-1'>
        {transactions
          .filter((t) => t.type === 'spent')
          .sort((a, b) => b.value - a.value)
          .slice(0, 6)
          .map((t) => (
            <RankingLine key={t.id} description={t.description} value={t.value} date={t.date} />
          ))}
      </div>
    </div>
  );
};
