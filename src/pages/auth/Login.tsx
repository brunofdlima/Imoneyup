import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Description, Input, Text } from '~/components/basics';
import { MultiSquares } from '~/components/complexes';
import { useAuth } from '~/context/AuthContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Inputs {
  email: string;
  password: string;
}

export const Login = () => {
  const { login } = useAuth();

  const form = React.useRef<Inputs>({
    email: '',
    password: '',
  });

  return (
    <div className='min-h-screen w-screen flex'>
      <div className='min-h-screen w-full xl:w-1/2 flex flex-col justify-center p-[7.5rem]'>
        <ToastContainer />
        <Text large>Login</Text>
        <Description className='mt-2 mb-20 text-sm'>
          Entre com seu usuário ou crie uma conta
        </Description>
        <Text className='mb-2'>Email:</Text>
        <Input
          placeholder='Email'
          onChange={({ target: { value } }) => (form.current.email = value)}
        />
        <Text className='mt-4 mb-2'>Senha:</Text>
        <Input
          type='password'
          placeholder='Senha'
          onChange={({ target: { value } }) => (form.current.password = value)}
        />
        <div className='flex items-center justify-between mt-4 mb-10'>
          <div className='flex'>
            <Input id='remember-me' type='checkbox' />
            <label htmlFor='remember-me' className='ml-2'>
              Lembrar de mim
            </label>
          </div>
          <Link to='/recuperar-senha' className='flex'>
            <Button variant='link'>Esqueceu sua senha?</Button>
          </Link>
        </div>
        <Button
          variant='auth'
          className='mb-10'
          onClick={() => login(form.current.email, form.current.password)}
        >
          Entrar
        </Button>
        <div className='flex items-center'>
          <Text className='mr-1'>Ainda não é cadastrado?</Text>
          <Link to='/cadastro' className='flex'>
            <Button variant='link'>Crie sua conta aqui!</Button>
          </Link>
        </div>
      </div>
      <div className='hidden xl:block min-h-screen w-1/2 relative bg-[#0050AA]'>
        <MultiSquares type='large-top' />
        <MultiSquares type='large-bottom' />
      </div>
    </div>
  );
};
