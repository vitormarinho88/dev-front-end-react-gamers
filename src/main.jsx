import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import AppProvider from './hooks';
import { Elements } from '@stripe/react-stripe-js';

import GlobalStyles from './styles/GlobalStyles';
import stripePromise from './Config/stripeConfig.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
      <GlobalStyles />
      <ToastContainer autoClose={2000} theme="dark" />
    </AppProvider>
  </StrictMode>,
);
