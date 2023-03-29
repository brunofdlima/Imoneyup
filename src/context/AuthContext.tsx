import React from 'react';
import { TransactionProps, UserProps, WalletProps } from '~/models';
import { authLogin, authMe, getTransactions, getWallets } from '~/services';
import { showToast } from '~/utils';

interface AuthContextProps {
  token: string;
  user: UserProps;
  wallets: WalletProps[];
  setWallets: React.Dispatch<React.SetStateAction<WalletProps[]>>;
  transactions: TransactionProps[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionProps[]>>;
  login: (email: string, password: string) => void;
  auth: () => Promise<void>;
}

const AuthContext = React.createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = React.useState<string>(localStorage.getItem('authToken') || '');
  const [user, setUser] = React.useState<UserProps>({
    id: 0,
    name: '',
    email: '',
  });
  const [wallets, setWallets] = React.useState<WalletProps[]>([]);

  const [transactions, setTransactions] = React.useState<TransactionProps[]>([]);

  React.useEffect(() => {
    setWallets(wallets.sort((a, b) => a.id - b.id));
  }, [wallets]);

  const auth = async () => {
    return authMe().then((res) => {
      setUser(res.data);

      getWallets(res.data.id)
        .then((res) => setWallets(res.data.sort((a, b) => a.id - b.id)))
        .catch(() => showToast('error', 'Erro ao carregar as carteiras.'));

      getTransactions(res.data.id)
        .then((res) => setTransactions(res.data.sort((a, b) => a.id - b.id)))
        .catch(() => showToast('error', 'Erro ao carregar as transações.'));
    });
  };

  const login = (email: string, password: string) => {
    authLogin(email, password)
      .then((res) => {
        setToken(res.data.authToken);
        localStorage.setItem('authToken', res.data.authToken);

        auth();
      })
      .catch(() =>
        showToast(
          'error',
          'Erro ao realizar login, verifique se os dados estão corretos e tente novamente.',
          'top-right',
        ),
      );
  };

  return (
    <AuthContext.Provider
      value={{ token, user, wallets, setWallets, transactions, setTransactions, login, auth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
