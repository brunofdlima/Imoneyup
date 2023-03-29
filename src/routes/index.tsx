import React from 'react';

import { AppProvider } from '~/context/AppContext';
import { useAuth } from '~/context/AuthContext';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

import { NavBar, PageTitle } from '~/components/complexes';

export const Router = () => {
  const { auth, user } = useAuth();

  React.useEffect(() => {
    auth();
  }, []);

  return user.id ? (
    <AppProvider>
      <div className='h-screen w-screen grid grid-cols-[15.625rem_minmax(0,_1fr)]'>
        <NavBar />
        <div className='flex flex-col'>
          <PageTitle />
          <div className='max-h-[calc(100vh-5.125rem)] flex-1 min-w-[48.375rem] p-5 bg-[#f5f5f5]'>
            <AppRoutes />
          </div>
        </div>
      </div>
    </AppProvider>
  ) : (
    <AuthRoutes />
  );
};
