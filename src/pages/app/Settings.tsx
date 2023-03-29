import React from 'react';

import { useAuth } from '~/context/AuthContext';

import { Button, Input, Text } from '~/components/basics';
import { editUser } from '~/services';
import { showToast } from '~/utils';

interface Inputs {
  name: string;
  email: string;
  password: string;
}

export const Settings = () => {
  const { user } = useAuth();

  const [inputIsDisabled, setInputIsDisabled] = React.useState(true);

  const form = React.useRef<Inputs>({
    name: user.name,
    email: user.email,
    password: '',
  });

  const edit = () => {
    const { name, email, password } = form.current;

    editUser(user.id, { name, email, password })
      .then(() => showToast('success', 'Usuário editado com sucesso!'))
      .catch(() => showToast('error', 'Erro ao editar usuário'));
  };

  const changeProfile = () => {
    if (inputIsDisabled) {
      setInputIsDisabled(false);
    } else {
      setInputIsDisabled(true);
      edit();
    }
  };

  return (
    <div className='w-[40rem]'>
      <Text className='mb-2'>Nome:</Text>
      <Input
        placeholder='Nome'
        defaultValue={user.name}
        disabled={inputIsDisabled}
        onChange={({ target: { value } }) => (form.current.name = value)}
      />
      <Text className='mt-4 mb-2'>Email:</Text>
      <Input
        type='email'
        placeholder='Email'
        defaultValue={user.email}
        disabled={inputIsDisabled}
        onChange={({ target: { value } }) => (form.current.email = value)}
      />
      <Text className='mt-4 mb-2'>Senha:</Text>
      <Input
        type='password'
        placeholder='Senha'
        disabled={inputIsDisabled}
        onChange={({ target: { value } }) => (form.current.password = value)}
      />
      <Button variant='auth' className='mt-10' onClick={changeProfile}>
        {inputIsDisabled ? 'Alterar perfil' : 'Salvar alterações'}
      </Button>
    </div>
  );
};
