import { ArrowLeft } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { Button, Description, Input, Text } from '~/components/basics';
import { MultiSquares } from '~/components/complexes';

export const RecoverPassword = () => {
  return (
    <div className='min-h-screen flex items-center justify-center p-8'>
      <MultiSquares type='large-top' />
      <MultiSquares type='large-bottom' />
      <div className='w-[40rem]'>
        <div className='flex items-center'>
          <Link to='/'>
            <button className='mr-3 rounded-full p-2 hover:text-[#0050AA] hover:shadow hover:ring-1 transition'>
              <ArrowLeft fontSize={20} />
            </button>
          </Link>
          <Text large>Esqueci minha senha</Text>
        </div>
        <Description className='mt-2 mb-10'>
          Recupere sua senha com o seu email cadastrado.
        </Description>
        <Text className='mb-2'>Email:</Text>
        <Input type='email' placeholder='Email' />
        <Button variant='auth' className='my-10'>
          Recuperar senha
        </Button>
        <div className='flex items-center'>
          <Text className='mr-1'>Ainda não é cadastrado?</Text>
          <Link to='/cadastro' className='flex'>
            <Button variant='link'>Crie sua conta aqui!</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
