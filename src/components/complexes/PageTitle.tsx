import React from 'react';

import { useLocation } from 'react-router-dom';

import { Text } from '../basics';

export const PageTitle = () => {
  const { pathname } = useLocation();

  const title = React.useMemo(() => {
    if (pathname === '/') {
      return 'Dashboard';
    }
    if (pathname === '/carteiras') {
      return 'Carteiras';
    }
    if (pathname === '/transacoes') {
      return 'Transações';
    }
    if (pathname === '/configuracoes') {
      return 'Configurações';
    }
    if (pathname === '/metas') {
      return 'Metas';
    }
  }, [pathname]);

  return (
    <div className='p-5'>
      <Text className='text-[1.75rem] font-bold'>{title}</Text>
    </div>
  );
};
