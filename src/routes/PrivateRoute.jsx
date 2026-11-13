import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../hooks/useUser.js';

export function PrivateRoute() {
  const { userInfo } = useUser();

  return userInfo?.token ? <Outlet /> : <Navigate to="/login" replace />;
}