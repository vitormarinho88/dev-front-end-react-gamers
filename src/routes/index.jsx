import { createBrowserRouter } from "react-router-dom";

import { Login } from "../containers/Login";
import { Register } from "../containers/Register";
import { Home } from "../containers/Home";
import { Menu } from "../containers/Menu";
import { Cart } from "../containers/Cart";

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