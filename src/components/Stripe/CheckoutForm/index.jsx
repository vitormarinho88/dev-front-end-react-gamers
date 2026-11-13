import { useState, useRef } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart.js';
import { api } from '../../../services/api.js';
import { toast } from 'react-toastify';
import '../styles.css';

export function CheckoutForm() {
  const { cartProducts, clearCart } = useCart();
  const redirectTimer = useRef(null);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const {
    state: { dpmCheckerLink },
  } = useLocation();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe ou Elements com falha, tente novamente');
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      try {
        const products = cartProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
          price: product.price,
        }));

        const { status } = await api.post(
          '/order',
          { products },
          { validateStatus: () => true },
        );

        if (status === 200 || status === 201) {
          redirectTimer.current = setTimeout(() => {
            navigate(
              `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
            );
          }, 2000);
          clearCart();
          toast.success('Pedido realizado com sucesso!');
          return;
        }

        if (status === 409) {
          toast.error('Falha ao realizar seu pedido');
        } else {
          throw new Error(`Status inesperado ao criar pedido: ${status}`);
        }
      } catch (error) {
        console.error(error);
        toast.error('Falha no sistema! Tente novamente');
      }
    } else {
      navigate(
        `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
      );
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'accordion',
  };

  return (
    <div className="container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="button"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pagar agora'
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      <div id="dpm-annotation">
        <p>
          Os metodos de pagamento são disponibilizados de acordo com a sua
          região&nbsp;
          <a
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            id="dpm-integration-checker"
          >
            Ver métodos de Pagamento
          </a>
        </p>
      </div>
    </div>
  );
}
