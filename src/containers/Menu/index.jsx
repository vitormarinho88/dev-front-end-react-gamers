import { useEffect , useState } from 'react';

import { api } from '../../services/api'; 
import { Container , Banner , ProductsContainer , CategoryMenu , CategoryButton } from './styles';
import { formatPrice } from '../../utils/formatPrice.js';
import {CardProduct} from '../../components/CardProduct';


export function Menu() {
  
  const [categories, setCategories] = useState([]);

  const [products , setProducts ] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');

      const newCategories = [{id: 0, name: 'Todas'}, ...data];
        
      setCategories(newCategories );
      
    };

    async function loadProducts() {
      const { data } = await api.get('/products');

      const newProducts = data.map((product) => 
      ({currencyValue: formatPrice(product.price), ...product,
        
      }));

      setProducts(newProducts);
      
    }  
     
    loadCategories();
    loadProducts();
  }, []);
  
  
  return (
    
    <Container>
       <Banner>
        <h1> 
            AS MELHORES 
            <br />
            PLACAS DE VIDEO 
            <br />
            ESTA AQUI!                     
        </h1>
      </Banner>
       
       <CategoryMenu>
       {categories.map((category) => (
          <CategoryButton key={category.id}>{category.name}</CategoryButton>
       ))}
       </CategoryMenu>
         
       <ProductsContainer>
       {products.map(product => (
         <CardProduct product={product} key={product.id}  />
       ))}
      </ProductsContainer>

    </Container>
   );

}
