import React from 'react';

interface Props {
  date: string;
  description: string;
  value: number;
}

type RankingLineBoxProps = JSX.IntrinsicElements['div'] & Props;

export const RankingLine: React.FC<RankingLineBoxProps> = ({ date, description, value }) => {
  return (
    <div className='w-full h-11 rounded grid grid-cols-3 mt-1 px-4 bg-slate-200'>
      <div className='flex items-center'>{description}</div>
      <div className='flex items-center'>{value}</div>
      <div className='flex justify-center items-center'>{date}</div>
    </div>
  );
};
