import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';
import AppProvider from './hooks';
import { Elements } from '@stripe/react-stripe-js';

import GlobalStyles from './styles/GlobalStyles';
import stripePromise from './Config/stripeConfig.js';
import { ThemeProvider } from 'styled-components';
import { standardTheme } from './styles/themes/standard.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <Elements stripe={stripePromise}>
          <BrowserRouter >
            <Router />
          </BrowserRouter >
        </Elements>
        <GlobalStyles />
        <ToastContainer autoClose={2000} theme="dark" />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
);
