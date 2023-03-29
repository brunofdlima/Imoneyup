import React from 'react';

import { GoalsBox } from '~/components/complexes/GoalsBox';
import { Modal } from '~/components/complexes/Modal';
import { Input, Text, Button, Select } from '~/components/basics';
import { Plus } from 'phosphor-react';

export const Goals = () => {
  const [addGoalsModalIsOpen, setAddGoalsModalIsOpen] = React.useState(false);
  return (
    <div>
      <div className='flex gap-4'>
        <GoalsBox titulo='Meta de receita' meta={100000} />
      </div>
      <Button variant='add' onClick={() => setAddGoalsModalIsOpen(true)} className='my-4'>
        <Plus weight='bold' />
        <Text className='ml-2'>Adicionar meta</Text>
      </Button>
      {addGoalsModalIsOpen && (
        <Modal title='Adicionar meta' closeModal={() => setAddGoalsModalIsOpen(false)}>
          <Text className='mt-4'>Meta:</Text>
          <Select>
            <option value='default'>Meta de receita</option>
            <option value='spent'>Meta de despesas</option>
            <option value='balance'>Meta de saldo</option>
          </Select>
          <Text className='mt-4'>Valor da meta:</Text>
          <Input placeholder='R$ 10.000' type='number'></Input>
        </Modal>
      )}
    </div>
  );
};
