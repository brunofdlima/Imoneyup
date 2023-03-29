import React from 'react';

import { Square } from '../basics';

interface Props {
  type?: 'large-top' | 'large-bottom' | 'small';
}

type MultiSquaresProps = JSX.IntrinsicElements['div'] & Props;

export const MultiSquares: React.FC<MultiSquaresProps> = ({ className, type }) => {
  if (type === 'small') {
    return (
      <div className={`flex flex-col gap-5 ${className}`}>
        <div className='flex gap-5'>
          <Square type='small' />
        </div>
        <div className='flex gap-5'>
          <Square type='small' />
          <Square type='small' />
        </div>
        <div className='flex gap-5'>
          <Square type='small' />
          <Square type='small' />
          <Square type='small' />
        </div>
        <div className='flex gap-5'>
          <Square type='small' />
          <Square type='small' />
        </div>
        <div className='flex gap-5'>
          <Square type='small' />
        </div>
      </div>
    );
  }

  if (type === 'large-bottom') {
    return (
      <div
        className={`hidden absolute bottom-[3.125rem] right-[3.125rem] xl:flex flex-col items-end gap-[3.125rem] ${className}`}
      >
        <div className='flex gap-[3.125rem]'>
          <Square />
        </div>
        <div className='flex gap-[3.125rem]'>
          <Square />
          <Square />
        </div>
        <div className='flex gap-[3.125rem]'>
          <Square />
          <Square />
          <Square />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`hidden absolute top-[3.125rem] left-[3.125rem] xl:flex flex-col gap-[3.125rem] ${className}`}
    >
      <div className='flex gap-[3.125rem]'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='flex gap-[3.125rem]'>
        <Square />
        <Square />
      </div>
      <div className='flex gap-[3.125rem]'>
        <Square />
      </div>
    </div>
  );
};
