import React from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Text } from '~/components/basics';

import { useAuth } from '~/context/AuthContext';

export const DashboardLineChart = () => {
  const { transactions } = useAuth();
  const graphRef = React.useRef<any>(null);

  const [graphHeight, setGraphHeight] = React.useState(0);
  const [graphArray, setGraphArray] = React.useState<
    { id: string; income: number; spent: number }[]
  >([]);

  React.useEffect(() => {
    const getGraphHeight = () => {
      if (graphRef.current) {
        setGraphHeight(Math.ceil(graphRef.current.offsetHeight));
      }
    };

    window.addEventListener('resize', getGraphHeight);
    getGraphHeight();

    return () => window.removeEventListener('resize', getGraphHeight);
  }, []);

  React.useEffect(() => {
    const sortedTransactions = transactions.sort((a, b) => (a.date > b.date ? 1 : -1));

    const dates: string[] = [];

    sortedTransactions.forEach((t) => {
      if (!dates.includes(t.date)) dates.push(t.date);
    });

    const newGraphArray = dates.map((d) =>
      sortedTransactions
        .filter((t) => d === t.date)
        .reduce(
          (acc: any, t) => {
            if (t.type === 'income') acc.income += t.value;
            else acc.spent += t.value;
            acc.id = t.date;
            return acc;
          },
          { income: 0, spent: 0 },
        ),
    );

    setGraphArray(newGraphArray);
  }, [transactions]);

  console.log(transactions);

  return (
    <div className='h-full w-full flex flex-col py-2 px-5 bg-white rounded shadow'>
      <div className='flex justify-between pb-4'>
        <div>
          <Text className='text-lg ml-12'>Balanço geral</Text>
        </div>
        <div className='flex gap-9 text-lg'>
          <div className='flex items-center gap-2'>
            <div className='bg-[#47E400] w-3 h-3 rounded-full'></div>
            <Text>Receitas</Text>
          </div>
          <div className='flex items-center gap-2'>
            <div className='bg-[#CC0000] w-3 h-3 rounded-full'></div>
            <Text>Despesas</Text>
          </div>
        </div>
      </div>
      <div ref={graphRef} className='w-full flex-1'>
        <ResponsiveContainer width='100%' height={graphHeight}>
          <LineChart data={graphArray}>
            <CartesianGrid strokeDasharray='6 2' />
            <Tooltip />
            <Line type='monotone' dataKey='income' stroke='#47E400' />
            <Line type='monotone' dataKey='spent' stroke='#CC0000' />
            <XAxis dataKey='id' />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
