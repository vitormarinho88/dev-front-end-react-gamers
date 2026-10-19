import Vector from '../../assets/Vector.svg';

import { ContainerButton } from './styles.js';


export function CartButton({...props}){
  
     return(
        <ContainerButton {...props}>
          <img src={Vector} alt="carrinho-de-compras" />
        </ContainerButton>    
  

     );

}