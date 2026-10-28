import { UserCircleIcon, ShoppingCartIcon } from '@phosphor-icons/react';

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
  return (
    <Container>
      <Content> 
      <Navigation>
        <div>
          <HeaderLink>Home</HeaderLink>
          <HeaderLink>Produtos</HeaderLink>
        </div>
      </Navigation>
      <Options>
        <Profile>
          <UserCircleIcon color='#333' size={24}/>
          <div>
            <p>
              Olá , <span>Vitor</span>
            </p>
            <Logout>Sair</Logout>
          </div>
        </Profile>
       <LinkContainer>
        <ShoppingCartIcon color='#fff' size={24} />
        <HeaderLink>Carrinho</HeaderLink>
      </LinkContainer>
      </Options>
     </Content>
    </Container>
  );
}
