import { createBrowserRouter } from "react-router-dom";

import { Cart, Menu, Home, Register, Login, CompletePayment, Checkout } from "../containers";

export const router = createBrowserRouter([
   {
         path: '/',
         element: <Login />,
   },
   {
         path: '/cadastro',
         element: <Register />,
   },
   {
         path: '/Home',
         element: <Home />,
   },
   {
         path: '/Menu',
         element: <Menu />,
   },
   {
        path: '/Cart',
        element:  <Cart />,
   },
   {
        path: '/Checkout',
        element:  <Checkout />,
   },
   {
        path: '/Complete',
        element:  <CompletePayment />,
   },
   

]);