import { Table } from '../index.js';
import { useCart } from '../../hooks/useCart.js';
import { formatPrice } from '../../utils/formatPrice.js';
import  TrashIcon  from '../../assets/trash.svg';

import { ProductImage, ButtonGroup, EmptyCart, ProductTotalPrice, TrashImage } from './styles.js';

export function CartItems() {
  const { CartProducts, increaseProduct, decreaseProduct,  deleteProduct  } = useCart();

  return (
    <Table.Root>
      <Table.Header>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Itens</Table.Th>
          <Table.Th>Preço</Table.Th>
          <Table.Th>Quantidade</Table.Th>
          <Table.Th>Total</Table.Th>
          <Table.Th></Table.Th> 
        </Table.Tr>
      </Table.Header>
      <Table.Body>
        {CartProducts?.length ? (
          CartProducts.map((product) => (
            <Table.Tr key={product.id}>
              <Table.Td>
                <ProductImage src={product.url} />
              </Table.Td>
              <Table.Td>{product.name}</Table.Td>
              <Table.Td>{product.currencyValue}</Table.Td>
              <Table.Td>
                <ButtonGroup>
                  <button onClick={() => decreaseProduct(product.id)}>-</button>
                  {product.quantity}
                  <button onClick={() => increaseProduct(product.id)}>+</button>
                </ButtonGroup>
              </Table.Td>

              <Table.Td>
                <ProductTotalPrice>{formatPrice(product.quantity * product.price)}</ProductTotalPrice>
              </Table.Td>
             <TrashImage src={TrashIcon} alt='Lixeira' onClick= {() => deleteProduct(product.id)} /> 
            </Table.Tr>
          ))
        ) : (
          <EmptyCart>Carrinho Vazio</EmptyCart>
        )}
      </Table.Body>
    </Table.Root>
  );
}
