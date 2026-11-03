import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '../Button';
import { Container } from './styles.js';

import { api } from '../../services/api.js';
import { useCart } from '../../hooks/useCart.js';
import { formatPrice } from '../../utils/formatPrice.js';

const DELIVERY_TAX = 500;

export function CartResume() {
  const navigate = useNavigate();
  const { cartProducts, clearCart } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTimer = useRef(null);

  const finalPrice = cartProducts.reduce(
    (acc, current) => current.price * current.quantity + acc,
    0,
  );

  useEffect(() => {
    return () => clearTimeout(redirectTimer.current);
  }, []);

  const submitOrder = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const products = cartProducts.map((product) => ({
      id: product.id,
      quantity: product.quantity,
    }));

    try {
      const { status } = await api.post(
        '/order',
        { products },
        { validateStatus: () => true },
      );

      if (status === 200 || status === 201) {
        toast.success('Pedido realizado com sucesso!');
        clearCart();

        redirectTimer.current = setTimeout(() => {
          navigate('/Home');
        }, 2000);
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

    setIsSubmitting(false);
  };

  return (
    <div>
      <Container>
        <div className="container-top">
          <h2 className="title">Resumo do pedido</h2>
          <p className="items">Itens</p>
          <p className="items-price">{formatPrice(finalPrice)}</p>
          <p className="delivery-tax">Taxa de Entrega</p>
          <p className="delivery-tax-price">{formatPrice(DELIVERY_TAX)}</p>
        </div>
        <div className="container-bottom">
          <p>Total</p>
          <p>{formatPrice(finalPrice + DELIVERY_TAX)}</p>
        </div>
      </Container>
      <Button onClick={submitOrder} disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Finalizar Pedido'}
      </Button>
    </div>
  );
}


/*
import { Button } from '../Button';
import { Container } from './styles.js';

import { api } from '../../services/api.js';
import { useCart } from '../../hooks/useCart.js';
import { toast } from 'react-toastify';
import { formatPrice } from '../../utils/formatPrice.js';
import { useEffect, useState, useNavigate } from 'react';

export function CartResume() {
  const navigate = useNavigate();

  const [finalPrice, setFinalPrice] = useState(0);

  const [deliveryTax] = useState(500);

  const { CartProducts, clearCart } = useCart();

  useEffect(() => {
    const sumaAllItems = CartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc;
    }, 0);

    setFinalPrice(sumaAllItems);
  }, [cartProducts]);

  const submitOrder = async () => {
    const products = CartProducts.map((product) => {
      return { id: product.id, quantity: product.quantity };
    });

    try {
      const { status } = await api.post(
        '/order',
        { products },
        {
          validateStatus: () => true,
        },
      );

      if (status === 200 || status === 201) {
        setTimeout(() => {
          navigate('/');
        }, 2000);
        toast.success('Pedido Realizado com sucesso !');

        clearCart();
      } else if (status === 409) {
        toast.error('Falha ao relizar seu pedido');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Falha no Sistema! Tente Novamente');
    }
  };

  return (
    <div>
      <Container>
        <div className="container-top">
          <h2 className="title">Resumo do pedido</h2>
          <p className="items">Itens</p>
          <p className="items-price">{formatPrice(finalPrice)}</p>
          <p className="delivery-tax">Taxa de Entrega</p>
          <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
        </div>
        <div className="container-bottom">
          <p>Total</p>
          <p>{formatPrice(finalPrice + deliveryTax)}</p>
        </div>
      </Container>
      <Button onClick={submitOrder}> Finalizar Pedido </Button>
    </div>
  );
};
*/