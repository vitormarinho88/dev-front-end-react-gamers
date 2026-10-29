import { createContext, useState, useEffect,  } from 'react';


export const CartContext = createContext({});

export const CartProvider = ({Children}) => {
    const [ CartProducts, setCartProducts ] = useState([]);

    const putProductInCart = (product) => {

    }

    const clearCart = () => {

    }

    const deleteProduct = (product) => {

    }
    
    const increaseProduct = (productId) => {

    }

    const decreaseProduct = (productId) => {

    }

    return(
      <CartContext.Provider value={{CartProducts, decreaseProduct, increaseProduct, deleteProduct, clearCart,  putProductInCart   }}>
        {Children}
      </CartContext.Provider>
    );
};

