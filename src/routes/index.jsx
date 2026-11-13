import { Route, Routes } from 'react-router-dom';

import {
  Cart,
  Menu,
  Home,
  Register,
  Login,
  CompletePayment,
  Checkout,
} from '../containers';

import { UserLayout } from '../layouts/UserLayout';

export function Router() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/carrinho' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/complete' element={<CompletePayment />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
    </Routes>
  );
}