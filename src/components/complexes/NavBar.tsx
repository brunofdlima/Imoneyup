import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button, Text } from '../basics';

import { MultiSquares } from '../complexes';

import {
  CalendarBlank,
  CurrencyCircleDollar,
  GearSix,
  ProjectorScreenChart,
  SignOut,
  Wallet,
} from 'phosphor-react';

import { useAuth } from '~/context/AuthContext';

export const NavBar = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
    location.reload();
  };

  return (
    <div className='h-full w-[15.625rem] flex flex-col bg-[#003060]'>
      <div className='m-5 mb-[2.875rem]'>
        <Text large className='mb-2 text-white'>
          {user.name}
        </Text>
        <Text className='text-[#dddddd]'>{user.email}</Text>
      </div>
      <div>
        <Link to='/' className='flex'>
          <Button variant='navbar' selected={pathname === '/'}>
            <ProjectorScreenChart /> Dashboard
          </Button>
        </Link>
        <Link to='/carteiras' className='flex'>
          <Button variant='navbar' selected={pathname === '/carteiras'}>
            <Wallet />
            Carteiras
          </Button>
        </Link>
        <Link to='/transacoes' className='flex'>
          <Button variant='navbar' selected={pathname === '/transacoes'}>
            <CurrencyCircleDollar />
            Transações
          </Button>
        </Link>
        <Link to='/metas' className='flex'>
          <Button variant='navbar' selected={pathname === '/metas'}>
            <CalendarBlank />
            Metas
          </Button>
        </Link>
        <Link to='/configuracoes' className='flex'>
          <Button variant='navbar' selected={pathname === '/configuracoes'}>
            <GearSix />
            Configurações
          </Button>
        </Link>
      </div>
      <div className='h-full flex items-center px-5'>
        <MultiSquares type='small' />
      </div>
      <Button variant='navbar' className='mb-10' onClick={logout}>
        <SignOut />
        Sair
      </Button>
    </div>
  );
};
