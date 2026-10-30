import { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({});

const STORAGE_KEY = 'devgamers:CartInfo';

const loadCart = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];      ///JSON.parse(data) converte a string JSON em um valor JavaScript.
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [CartProducts, setCartProducts] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(CartProducts));
  }, [CartProducts]);

  const putProductInCart = (product) => {
    setCartProducts((prev) => {
      const exists = prev.some((prd) => prd.id === product.id);
                                                                                 /// (prev) representa o estado anterior do carrinho. 
                                                                                 // Isso é importante porque o React pode agrupar 
                                                                                 // atualizações de estado, e utilizar o estado 
                                                                                 // anterior evita depender de uma variável que 
                                                                                 // possa estar desatualizada.    
                                                                                 //Você está dizendo: “Receba o carrinho atual, analise seus produtos e devolva o novo carrinho”.
      if (exists) {
        return prev.map((prd) =>
          prd.id === product.id ? { ...prd, quantity: prd.quantity + 1 } : prd,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const clearCart = () => setCartProducts([]);

  const deleteProduct = (productId) => {
    setCartProducts((prev) => prev.filter((prd) => prd.id !== productId));
  };

  const increaseProduct = (productId) => {
    setCartProducts((prev) =>
    prev.map((prd) => prd.id === productId ? { ...prd, quantity: prd.quantity + 1 } : prd,));
  };

  const decreaseProduct = (productId) => {
    setCartProducts(
      (prev) =>
        prev.map((prd) =>prd.id === productId ? 
       { ...prd, quantity: prd.quantity - 1 } : prd,)
        .filter((prd) => prd.quantity > 0), 
    );
  };

  return (
    <CartContext.Provider
      value={{
        CartProducts,
        putProductInCart,
        clearCart,
        deleteProduct,
        increaseProduct,
        decreaseProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/*
import { createContext, useState, useEffect,  } from 'react';


// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [ CartProducts, setCartProducts ] = useState([]);

    const putProductInCart = (product) => {
      const cartIndex = CartProducts.findIndex((prd) => prd.id === product.id);
   
      let newProductsInCart = [];

      if(cartIndex >= 0) {
        newProductsInCart = CartProducts;

        newProductsInCart[cartIndex].quantity = 
        newProductsInCart[cartIndex].quantity + 1;
        
        setCartProducts(newProductsInCart);
      }else{
        product.quantity = 1;
        newProductsInCart = [...CartProducts, product];
        setCartProducts(newProductsInCart);
      }
   
   
    };


    const clearCart = () => {

    }

    const deleteProduct = (productId) => {
      const newCart = CartProducts.filter((prd) => prd.id !== productId);    

      setCartProducts(newCart)
       updateLocalStorage(newCart); 
    };
    
    const increaseProduct = (productId) => {
        const newCart = CartProducts.map((prd) => {
          return prd.id === productId ? {...prd, quantity: prd.quantity + 1 } : prd;
        });
      
        setCartProducts(newCart)
         updateLocalStorage(newCart); 
      };

    const decreaseProduct = (productId) => {
     const cartIndex = CartProducts.findIndex((prd) => prd.id === productId);
    
     if(CartProducts[cartIndex].quantity > 1){
       const newCart = CartProducts.map((prd)=> {
        return prd.id ===productId ? {...prd, quantity: prd.quantity -1} : prd;
       });
        
        updateLocalStorage(newCart); 
        setCartProducts(newCart)
      }else{
       deleteProduct(productId)
     }
          
    };

    
   const updateLocalStorage = (products) => {
    localStorage.setItem('devgamers:CartInfo', JSON.stringify(products));
   
  };
    
   useEffect(() => {
     const clientCartData = localStorage.getItem('devgamers:CartIndo');
     if(clientCartData) {
      setCartProducts(JSON.parse(clientCartData));
     }
   }, []);


    return(
      <CartContext.Provider value={{CartProducts, decreaseProduct, increaseProduct, deleteProduct, clearCart,  putProductInCart   }}>
        {children }
      </CartContext.Provider>
    );
};

*/
