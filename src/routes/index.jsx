import { Navigate, Route, Routes } from 'react-router-dom';

import {
  Cart,
  Menu,
  Home,
  Register,
  Login,
  CompletePayment,
  Checkout,
  Admin,
} from '../containers';

import { UserLayout } from '../layouts/UserLayout';
import { PrivateRoute } from './PrivateRoute';
import { AdminLayout } from '../layouts/AdminLayout';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/complete" element={<CompletePayment />} />
        </Route>
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/home" element={<Admin />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
