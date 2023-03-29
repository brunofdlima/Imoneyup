import React from 'react';

import { useAuth } from '~/context/AuthContext';

import { Button, Input } from '../basics';

import { editWallet, saveWallet } from '~/services';

import { Check, PencilSimpleLine, Trash, X } from 'phosphor-react';
import { showToast } from '~/utils';
import { WalletProps } from '~/models';

interface Props {
  data?: WalletProps;
  editable?: boolean;
  removeWallet?: any;
  cancelAddWallet?: any;
}

type AccountProps = JSX.IntrinsicElements['div'] & Props;

export const Wallet: React.FC<AccountProps> = ({
  data,
  editable,
  removeWallet,
  cancelAddWallet,
  ...rest
}) => {
  const { user, setWallets } = useAuth();

  const [input, setInput] = React.useState(data?.description || '');
  const [savedInput, setSavedInput] = React.useState('');
  const [inputIsEnabled, setInputIsEnabled] = React.useState(editable);

  const edition = () => {
    setSavedInput(input);
    setInputIsEnabled(true);
  };

  const cancelEdition = () => {
    if (data?.id === 0) {
      cancelAddWallet();
    } else {
      setInput(savedInput);
      setInputIsEnabled(false);
    }
  };

  const save = () => {
    if (input) {
      if (data && data?.id !== 0) {
        editWallet(data?.id, user.id, input)
          .then((res) => {
            setWallets((old) => [
              ...old.filter((w: WalletProps) => w.id !== res.data.id),
              res.data,
            ]);
            showToast('success', 'Carteira editada com sucesso!');
          })
          .catch(() => {
            showToast('error', 'Erro ao editar carteira.');
          })
          .finally(() => setInputIsEnabled(false));
      } else {
        saveWallet(user.id, input)
          .then((res) => {
            setWallets((old) => [...old.filter((w: WalletProps) => w.id !== 0), res.data]);
            showToast('success', 'Carteira adicionada com sucesso!');
          })
          .catch(() => {
            showToast('error', 'Erro ao adicionar carteira.');
          })
          .finally(() => setInputIsEnabled(false));
      }
    } else {
      showToast('warning', 'Adicione uma descrição para poder adicionar uma carteira.');
    }
  };

  const ref = React.useRef<any>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (data?.id === 0) {
          cancelAddWallet();
        } else {
          setInputIsEnabled(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, cancelAddWallet, data]);

  return (
    <div {...rest} ref={ref} className='flex items-center'>
      <Input
        noRing
        disabled={!inputIsEnabled}
        value={input}
        onChange={({ target: { value } }) => setInput(value)}
        className={`border ${inputIsEnabled && 'shadow bg-white'}`}
      />
      <Button
        className={`p-2 mx-2 rounded-full hover:bg-[#e0e0e0] ${
          inputIsEnabled ? 'hover:text-red-600' : 'hover:text-blue-600'
        }`}
        title={inputIsEnabled ? 'Cancelar' : 'Editar'}
        onClick={inputIsEnabled ? cancelEdition : edition}
      >
        {inputIsEnabled ? <X weight='bold' fontSize={20} /> : <PencilSimpleLine fontSize={20} />}
      </Button>
      <Button
        className={`p-2 rounded-full hover:bg-[#e0e0e0] ${
          inputIsEnabled ? 'hover:text-green-600' : 'hover:text-red-600'
        }`}
        title={inputIsEnabled ? 'Salvar' : `Excluir ${input}`}
        onClick={inputIsEnabled ? save : removeWallet}
      >
        {inputIsEnabled ? <Check weight='bold' fontSize={20} /> : <Trash fontSize={20} />}
      </Button>
    </div>
  );
};
