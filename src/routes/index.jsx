import { createBrowserRouter } from "react-router-dom";

import { Cart, Menu, Home, Register, Login } from "../containers";

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
]);