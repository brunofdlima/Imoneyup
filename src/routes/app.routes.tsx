import { Route, Routes } from 'react-router-dom';
import { Dashboard, Settings, Transactions, Wallets } from '~/pages/app';

export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Dashboard />} />
    <Route path='/carteiras' element={<Wallets />} />
    <Route path='/transacoes' element={<Transactions />} />
    <Route path='/configuracoes' element={<Settings />} />
  </Routes>
);
