
import { useEffect , useState } from 'react';

import { api } from '../../services/api'; 
import { Container , Banner , ProductsContainer , CategoryMenu } from './styles';


export function Menu() {
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');

      
      

      
      setCategories(data);
      
    };

    loadCategories();
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

       </CategoryMenu>
         
       <ProductsContainer>

      </ProductsContainer>

    </Container>
   );

}
