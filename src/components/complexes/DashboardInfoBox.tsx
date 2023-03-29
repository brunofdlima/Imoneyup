import React from 'react';

import { Text } from '../basics';

interface Props {
  icon?: React.ReactNode;
  description?: string;
  value?: string;
  iconContainerColor?: string;
}

type DashboardInfoBoxProps = JSX.IntrinsicElements['div'] & Props;

export const DashboardInfoBox: React.FC<DashboardInfoBoxProps> = ({
  icon,
  description,
  value,
  iconContainerColor,
}) => {
  return (
    <div className='h-fit w-full flex items-center justify-between gap-6 py-2 px-4 rounded bg-white shadow'>
      <div className='grid gap-1'>
        <Text className='text-base'>{description}</Text>
        <Text className='flex items-center text-lg'>R$ {value}</Text>
      </div>
      <div
        className={`p-2 rounded flex items-center justify-center text-[2rem] ${iconContainerColor}`}
      >
        {icon}
      </div>
    </div>
  );
};
