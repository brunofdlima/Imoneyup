import { Route, Routes } from 'react-router-dom';

import { Login, RecoverPassword, Register } from '~/pages/auth';

export const AuthRoutes = () => (
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/cadastro' element={<Register />} />
    <Route path='/recuperar-senha' element={<RecoverPassword />} />
  </Routes>
);
