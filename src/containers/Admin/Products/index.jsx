import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Container, ProductImage, EditButton } from './styles.js';
import { CheckCircleIcon, PencilIcon, XCircleIcon } from '@phosphor-icons/react';
import { formatPrice } from '../../../utils/formatPrice.js'
import { useNavigate } from 'react-router-dom';


export function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');

      setProducts(data);
    }

    loadProducts();
  }, []);

 
  function isOffer(offer){
    if(offer){
      return <CheckCircleIcon color='#61a120' />;
    }else{
      return <XCircleIcon color='#ff3205' sizw='28' />;
    }
  }


  function editProduct(product){
   navigate("/admin/editar-produto", {state: {product}});

  } 


  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Produto em Oferta</TableCell>
              <TableCell>Imagem do Produto</TableCell>
              <TableCell>Editar Produto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="center">{formatPrice(product.price)}</TableCell>
                <TableCell align="center">{isOffer(product.offer)}</TableCell>
                <TableCell align="center">
                  <ProductImage src={product.url} />
                </TableCell>
                <TableCell align="center">
                  <EditButton onClick={() => editProduct(product)}>
                    <PencilIcon />
                  </EditButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
