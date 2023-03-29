import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Description, Input, Text } from '~/components/basics';
import { MultiSquares } from '~/components/complexes';
import { api } from '~/services';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '~/utils';

interface Inputs {
  name: string;
  email: string;
  password: string;
}

export const Register = () => {
  const form = React.useRef<Inputs>({
    name: '',
    email: '',
    password: '',
  });

  const signup = () => {
    const { name, email, password } = form.current;

    api
      .post('/auth/signup', {
        name,
        email,
        password,
      })
      .then(() => {
        showToast('success', 'Cadastro realizado com sucesso!');
      })
      .catch(() =>
        showToast(
          'error',
          'Erro ao realizar cadastro, verifique se os dados estão corretos e tente novamente.',
        ),
      );
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8'>
      <ToastContainer />
      <MultiSquares type='large-top' />
      <MultiSquares type='large-bottom' />
      <div className='w-[40rem]'>
        <Text large>Cadastro de usuário</Text>
        <Description className='mt-2 mb-10'>
          Preencha os campos com seus dados para realizar o cadastro.
        </Description>
        <Text className='mb-2'>Nome:</Text>
        <Input
          placeholder='Nome'
          onChange={({ target: { value } }) => (form.current.name = value)}
        />
        <Text className='mt-4 mb-2'>Email:</Text>
        <Input
          type='email'
          placeholder='Email'
          onChange={({ target: { value } }) => (form.current.email = value)}
        />
        <Text className='mt-4 mb-2'>Senha:</Text>
        <Input
          type='password'
          placeholder='Senha'
          onChange={({ target: { value } }) => (form.current.password = value)}
        />
        <Button variant='auth' className='my-10' onClick={signup}>
          Cadastrar
        </Button>
        <div className='flex items-center'>
          <Text className='mr-1'>Já é cadastrado?</Text>
          <Link to='/' className='flex'>
            <Button variant='link'>Faça login!</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
