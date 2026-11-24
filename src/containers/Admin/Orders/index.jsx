import { Row } from './row';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../services/api.js';
import { orderStatusOptions } from './orderStatus.js';
import { Filter, FilterOption } from './styles.js';

function createData(order) {
  return {
    name: order.user.name,
    orderId: order._id,
    date: order.createdAt,
    status: order.status,
    products: order.products,
  };
}

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [ActiveStatus, setActiveStatus] = useState([0]);

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get('order');

      setOrders(data);
      setFilteredOrders(data);
    }

    loadOrders();
  }, []);

  const rows = useMemo(() => filteredOrders.map(createData), [filteredOrders]);

  function handleStatus(status) {
    if (status.id === 0) {
      setFilteredOrders(orders);
    } else {
      const newOrders = orders.filter((order) => order.status === status.value);

      setFilteredOrders(newOrders);
    }
 
    setActiveStatus(status.id)
  }

  return (
    <>
      <Filter>
        {orderStatusOptions.map((status) => (
          <FilterOption
            key={status.id}
            onClick={() => handleStatus(status)}
            $isActiveStatus={ActiveStatus === status.id}
          >
            {status.label}
          </FilterOption>
        ))}
      </Filter>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data do pedido</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.orderId}
                row={row}
                orders={orders}
                setOrders={setOrders}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
