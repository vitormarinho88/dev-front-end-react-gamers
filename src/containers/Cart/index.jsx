import Logo from '../../assets/gamers_2.svg';

import { Container, Banner, Title, Content } from './styles.js';

export function Cart() {
  return (
    <Container>
      <Banner>
        <img src={Logo} alt='logo devgamers'/>
      </Banner>
      <Title> Checkout - Pedido </Title>
      <Content>

      </Content>
    </Container>
  );
}
