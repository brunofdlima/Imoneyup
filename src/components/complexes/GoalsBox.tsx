import React from 'react';
import { Text } from '../basics';
import { PieChart, Pie, Cell } from 'recharts';

import { useAuth } from '~/context/AuthContext';

interface Props {
  titulo: string;
  meta: number;
}

export const GoalsBox: React.FC<Props> = ({ titulo, meta }) => {
  const { transactions } = useAuth();
  let valueIncome = 0;
  transactions.filter((t) => (t.type === 'income' ? (valueIncome += t.value) : ''));
  const data = [{ value: valueIncome }];
  const percent = valueIncome / meta;
  const color = React.useMemo(() => {
    if (percent > 1) {
      return '#08fd00';
    }
    if (percent >= 0.8 && percent <= 1) {
      return '#08fd00';
    }
    if (percent >= 0.6 && percent < 0.8) {
      return '#4db601';
    }
    if (percent >= 0.4 && percent < 0.6) {
      return '#FFF522';
    }
    if (percent >= 0.2 && percent < 0.4) {
      return '#cd3300';
    }
    if (percent < 0.2) {
      return '#fe0000';
    }
  }, [percent]);
  return (
    <div className='bg-[#003060] rounded-lg text-center text-white p-1 py-4'>
      <Text large>{titulo}</Text>
      <PieChart height={260} width={340}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          endAngle={360}
          fill='#898989'
          dataKey='value'
          stroke='0'
          cornerRadius={10}
        ></Pie>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          endAngle={percent * 360}
          fill={color}
          label
          dataKey='value'
          stroke='0'
          cornerRadius={10}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Pie>
      </PieChart>
      <div className='flex justify-evenly'>
        <div>Meta: {meta}</div>
        <div>Alcançado: {(percent * 100).toFixed(2)}%</div>
      </div>
    </div>
  );
};
