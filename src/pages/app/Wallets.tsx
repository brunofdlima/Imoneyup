import { useAuth } from '~/context/AuthContext';

import { Button, Text } from '~/components/basics';

import { Wallet } from '~/components/complexes';

import { Plus } from 'phosphor-react';

import { ToastContainer } from 'react-toastify';

import { deleteWallet } from '~/services';
import { WalletProps } from '~/models';
import { showToast } from '~/utils';

export const Wallets = () => {
  const { user, wallets, setWallets } = useAuth();

  const removeWallet = (wallet: WalletProps) => {
    if (confirm(`Tem certeza que deseja excluir a carteira "${wallet.description}" ?`)) {
      deleteWallet(wallet.id)
        .then(() => {
          showToast('success', 'Carteira excluída com sucesso!');
          setWallets((old) => old.filter((w: WalletProps) => wallet.id !== w.id));
        })
        .catch(() => {
          showToast('error', 'Erro ao excluir carteira.');
        });
    }
  };

  const addWallet = () => {
    setWallets((old) => [
      ...old,
      {
        id: 0,
        user_id: user.id,
        description: '',
      },
    ]);
  };

  const cancelAddWallet = () => {
    setWallets((old) => old.filter((w: WalletProps) => w.id !== 0));
  };

  return (
    <div>
      <ToastContainer />
      <div className='w-[25rem] grid gap-2'>
        {wallets.map((wallet: WalletProps) => {
          return (
            <Wallet
              key={wallet.id}
              editable={wallet.id === 0}
              data={wallet}
              removeWallet={() => removeWallet(wallet)}
              cancelAddWallet={cancelAddWallet}
            />
          );
        })}
      </div>
      <Button
        disabled={wallets.some((w: WalletProps) => w.id === 0)}
        variant='add'
        className={wallets.length > 0 ? 'mt-4' : ''}
        onClick={addWallet}
      >
        <Plus weight='bold' />
        <Text className='ml-2'>Adicionar carteira</Text>
      </Button>
    </div>
  );
};
