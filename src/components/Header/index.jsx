import { UserCircleIcon, ShoppingCartIcon } from '@phosphor-icons/react';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';

import {
  Container,
  Navigation,
  HeaderLink,
  Options,
  Profile,
  Logout,
  LinkContainer,
  Content
} from './styles';

export function Header() {
  
  const navigate = useNavigate();
  const {pathname} = useResolvedPath();
  
  const { logout, userInfo } = useUser();

  function logoutUser() {
    logout();
    navigate('/') 
  };
  
  
  return (
    <Container>
      <Content> 
      <Navigation>
        <div>
          <HeaderLink to="/" $isActive={pathname ==='/'}>Home</HeaderLink>
          <hr> </hr>
          <HeaderLink to="/Menu" $isActive={pathname === '/Menu'}>Produtos</HeaderLink>
        </div>
      </Navigation>
      <Options>
        <Profile>
          <UserCircleIcon color='#333' size={24}/>
          <div>
            <p>
              Olá , <span>{userInfo.name}</span>
            </p>
            <Logout onClick={logoutUser}>Sair</Logout>
          </div>
        </Profile>
       <LinkContainer>
        <ShoppingCartIcon color='#fff' size={24} />
        <HeaderLink to="/carriho">Carrinho</HeaderLink>
      </LinkContainer>
      </Options>
     </Content>
    </Container>
  );
}
