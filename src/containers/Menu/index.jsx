import { useEffect, useState } from 'react';

import { api } from '../../services/api.js';
import {
  Container,
  Banner,
  ProductsContainer,
  CategoryMenu,
  CategoryButton,

} from './styles.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { CardProduct } from '../../components/CardProduct';
import { ReturnButton } from '../../components/ReturnButton';
import { useLocation, useNavigate} from 'react-router-dom';

export function Menu() {
 
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();

  const { search } = useLocation();
  
  const queryParams = new URLSearchParams(search);
   

  const [activeCategory, setActiveCategory] = useState(() =>{
    const categoryId = +queryParams.get('categoria');
   
    if(categoryId){
      return categoryId;
    }

    return 0;
  });

 


  useEffect(() => {
    
    async function loadCategories() {
      const { data } = await api.get('/categories');

      const newCategories = [{ id: 0, name: 'Todas' }, ...data];

      setCategories(newCategories);
    }

    async function loadProducts() {
      const { data } = await api.get('/products');

      const newProducts = data.map((product) => ({
        currencyValue: formatPrice(product.price),
        ...product,
      }));

      setProducts(newProducts);
    }

    loadCategories();
    loadProducts();
 
 }, []);

  const filtered = activeCategory === 0 ? products : products.filter((product) => product.category_id === activeCategory);
 


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
        <ReturnButton onClick={()=> {
           navigate('/Home')
        }}> </ReturnButton>
      </Banner>
      
      
      

      <CategoryMenu>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            $isActiveCategory={category.id === activeCategory }
            onClick={() => {
              navigate(
                {
                  pathname: '/Menu',
                  search: `?categoria=${category.id}`,
                },
                {
                  replace: true,
                },
              );

              setActiveCategory(category.id);
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>

      <ProductsContainer>
        {filtered.map((product) => (
          <CardProduct product={product} key={product.id} />
        ))}
      </ProductsContainer>
    </Container>
  );
}
