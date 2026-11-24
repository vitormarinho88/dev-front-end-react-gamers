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
  const [activeStatus, setActiveStatus] = useState(0); // número, não array

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get('order');
      setOrders(data);
    }

    loadOrders();
  }, []);

  const rows = useMemo(() => {
    const selected = orderStatusOptions.find(
      (item) => item.id === activeStatus,
    );

    const filtered = !selected || selected.id === 0
        ? orders
        : orders.filter((order) => order.status === selected.value);

    return filtered.map(createData);
  }, [orders, activeStatus]);

  return (
    <>
      <Filter>
        {orderStatusOptions.map((status) => (
          <FilterOption
            key={status.id}
            onClick={() => setActiveStatus(status.id)}
            $isActiveStatus={activeStatus === status.id}
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
