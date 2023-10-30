import React from 'react';
import { useAuth } from '~/context/AuthContext';
import { CategoryEnum } from '~/enums';

import { TransactionProps } from '~/models';

import { deleteTransaction, editTransaction, saveTransaction } from '~/services';

import { showToast } from '~/utils';

import { Button, Input, Select, Text } from '../basics';

import { Modal } from '../complexes';

interface TransactionModalProps {
  transaction?: TransactionProps;
  closeTransactionModal(): void;
}

export const TransactionModal = ({ transaction, closeTransactionModal }: TransactionModalProps) => {
  const [formIsEditable, setFormIsEditable] = React.useState(transaction?.id ? false : true);
  const [transactionTypeIsIncomne, setTransactionTypeIsIncomne] = React.useState(
    transaction?.type === 'income' ? true : false,
  );

  const form = React.useRef<TransactionProps>({
    category_id: transaction?.category_id || 0,
    date: transaction?.date || '',
    description: transaction?.description || '',
    favorite: transaction?.favorite,
    value: transaction?.value || 0,
    wallet_id: transaction?.wallet_id || '',
  } as TransactionProps);

  const { user, wallets, setTransactions } = useAuth();

  const save = () => {
    const { category_id, date, description, favorite, value, wallet_id } = form.current;

    saveTransaction({
      category_id,
      date,
      description,
      favorite,
      type: transactionTypeIsIncomne ? 'income' : 'spent',
      user_id: user.id,
      value,
      wallet_id,
    })
      .then((res) => {
        setTransactions((old) => [...old, res.data]);
        closeTransactionModal();
        showToast('success', 'Transação adicionada com sucesso!');
      })
      .catch(() => {
        showToast('error', 'Erro ao adicionar transação.');
      });
  };

  const edit = () => {
    if (transaction?.id) {
      const { category_id, date, description, favorite, value, wallet_id } = form.current;

      editTransaction(transaction?.id, {
        category_id,
        date,
        description,
        favorite,
        type: transactionTypeIsIncomne ? 'income' : 'spent',
        user_id: user.id,
        value,
        wallet_id,
      })
        .then((res) => {
          setTransactions((old) => [...old.filter((w) => w.id !== transaction?.id), res.data]);
          closeTransactionModal();
          showToast('success', 'Transação editada com sucesso!');
        })
        .catch(() => {
          showToast('error', 'Erro ao editar transação.');
        });
    }
  };

  const saveButtonAction = () => {
    if (!formIsEditable) {
      setFormIsEditable(true);
    } else {
      if (transaction?.id) {
        edit();
      } else {
        save();
      }
    }
  };

  const deleteButtonAction = () => {
    if (transaction?.id) {
      if (confirm(`Tem certeza que deseja excluir a transação "${transaction?.description}" ?`)) {
        deleteTransaction(transaction?.id)
          .then(() => {
            setTransactions((old) => [...old.filter((w) => w.id !== transaction?.id)]);
            closeTransactionModal();
            showToast('success', 'Transação excluída com sucesso!');
          })
          .catch(() => {
            showToast('error', 'Erro ao excluir transação.');
          });
      }
    }
  };

  return (
    <Modal
      title={transaction?.id ? `Transação "${transaction?.description}"` : 'Adicionar transação'}
      closeModal={closeTransactionModal}
    >
      <div className='grid grid-cols-2 gap-4 pt-10'>
        <div className='col-span-2'>
          <Text className='mb-2'>Descrição:</Text>
          <Input
            placeholder='Descrição'
            defaultValue={transaction?.description}
            disabled={formIsEditable ? false : true}
            onChange={({ target: { value } }) => (form.current.description = value)}
            className='placeholder-opacity-50'
          />
        </div>
        <div>
          <Text className='mb-2'>Categoria:</Text>
          <Select
            variant='modal'
            defaultValue={
              transaction?.category_id ? CategoryEnum[transaction?.category_id] : 'default'
            }
            disabled={formIsEditable ? false : true}
            onChange={({ target: { value } }) => (form.current.category_id = Number(value))}
          >
            <option value='default' disabled>
              Escolha uma categoria
            </option>
            {transactionTypeIsIncomne ? (
              <>
                <option value='9'>Vendas</option>
                <option value='10'>Aluguéis</option>
                <option value='11'>Salário</option>
                <option value='12'>Investimentos</option>
                <option value='7'>Serviços</option>
                <option value='13'>Outros</option>
              </>
            ) : (
              <>
                <option value='1'>Imóveis</option>
                <option value='2'>Transportes</option>
                <option value='3'>Eletrônicos e celulares</option>
                <option value='4'>Hobbies e Lazer</option>
                <option value='5'>Animais de estimação</option>
                <option value='6'>Moda e beleza</option>
                <option value='7'>Serviços</option>
                <option value='8'>Sua casa</option>
                <option value='12'>Investimentos</option>
                <option value='13'>Outros</option>
              </>
            )}
          </Select>
        </div>
        <div>
          <Text className='mb-2'>Carteira:</Text>
          <Select
            variant='modal'
            defaultValue={
              wallets.find((w) => w.id === transaction?.wallet_id)?.description || 'default'
            }
            disabled={formIsEditable ? false : true}
            onChange={({ target: { value } }) => (form.current.wallet_id = Number(value))}
          >
            <option value='default' disabled>
              Escolha uma carteira
            </option>
            {wallets.map((w) => (
              <option key={w.id} value={w.id}>
                {w.description}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Text className='mb-2'>Valor:</Text>
          <Input
            type='number'
            placeholder='Valor'
            defaultValue={transaction?.value}
            disabled={formIsEditable ? false : true}
            onChange={({ target: { value } }) => (form.current.value = Number(value))}
            className='placeholder-opacity-50'
          />
        </div>
        <div>
          <Text className='mb-2'>Data:</Text>
          <Input
            type='date'
            defaultValue={transaction?.date}
            disabled={formIsEditable ? false : true}
            onChange={({ target: { value } }) => (form.current.date = value)}
          />
        </div>
        <div>
          <Text className='mb-2'>Tipo de transação:</Text>
          <div className='flex items-center gap-4'>
            <div className='flex items-center'>
              <Input
                type='radio'
                checked={transactionTypeIsIncomne}
                disabled={formIsEditable ? false : true}
                onChange={() => setTransactionTypeIsIncomne(true)}
                id='income-type'
                name='transaction-type'
              />
              <label htmlFor='income-type' className='ml-2'>
                Renda
              </label>
            </div>
            <div className='flex items-center'>
              <Input
                type='radio'
                checked={!transactionTypeIsIncomne}
                disabled={formIsEditable ? false : true}
                onChange={() => setTransactionTypeIsIncomne(false)}
                id='spent-type'
                name='transaction-type'
              />
              <label htmlFor='spent-type' className='ml-2 mr-4'>
                Gasto
              </label>
            </div>
          </div>
        </div>
        <div className='flex'>
          <Input
            type='checkbox'
            id='favorite-transaction'
            defaultChecked={transaction?.favorite}
            disabled={formIsEditable ? false : true}
            onChange={({ target: { checked } }) => (form.current.favorite = checked)}
          />
          <label htmlFor='favorite-transaction' className='ml-2'>
            Favoritar?
          </label>
        </div>
        <div className={`col-span-2 flex ${transaction?.id ? 'justify-between' : 'justify-end'}`}>
          <Button
            variant='delete'
            className={transaction?.id ? 'block' : 'hidden'}
            onClick={deleteButtonAction}
          >
            Excluir
          </Button>
          <Button variant='confirm' onClick={saveButtonAction}>
            {formIsEditable ? 'Salvar' : 'Editar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
