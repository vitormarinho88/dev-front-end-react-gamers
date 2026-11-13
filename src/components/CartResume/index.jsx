import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '../Button';
import { Container } from './styles.js';

import { api } from '../../services/api.js';
import { useCart } from '../../hooks/useCart.js';
import { formatPrice } from '../../utils/formatPrice.js';


export function CartResume() {
  const navigate = useNavigate();
  const { cartProducts, clearCart } = useCart();

   console.log(clearCart);

  const [isSubmitting, setIsSubmitting] = useState(false); //INICIALIZAÇÃO(FALSE)
  const redirectTimer = useRef(null);

  const finalPrice = cartProducts.reduce(
    (acc, current) => current.price * current.quantity + acc,  ///reduce , reduz os numeros de um array inteiro para um valor 
    0,
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearTimeout(redirectTimer.current);
  }, []);

  const submitOrder = async () => {
    if (isSubmitting) return;                                ////Uma ressalva técnica: essa proteção no frontend melhora a experiência, mas não garante que pedidos duplicados sejam impossíveis. O backend também precisa proteger a operação, por exemplo, utilizando uma chave de idempotência ou alguma regra de negócio apropriada.
    setIsSubmitting(true);

    const products = cartProducts.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      price: product.price,                            ///map, so preciso de (id , quantity e price)
    }));


    try {
     const {data} = await api.post('/create-payment-intent', {products});
     
      navigate('/checkout', {
        state: data,
      });
    } catch ( error ) {
      console.error(error); 
       toast.error('Erro, tente novamente', {
          position: 'top-right',
          autoClose:5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
    }

    
  };

  return (
    <div>
      <Container>
        <div className="container-top">
          <h2 className="title">Resumo do pedido</h2>
          <p className="items">Itens</p>
          <p className="items-price">{formatPrice(finalPrice)}</p>
        </div>
        <div className="container-bottom">
          <p>Total</p>
          <p>{formatPrice(finalPrice)}</p>
        </div>
      </Container>
      <Button onClick={submitOrder} disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Finalizar Pedido'}
      </Button>
    </div>
  );
}



////Um detalhe de arquitetura: esse cálculo está no frontend
//  para apresentar o resumo ao usuário. Entretanto, 
// o backend precisa recalcular o valor utilizando 
// os preços oficiais do banco de dados. Nunca confie 
// no preço enviado pelo frontend para fechar um pedido.