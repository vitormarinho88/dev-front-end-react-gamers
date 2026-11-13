import { CategoriesCarousel, OffersCarousel } from '../../components';
import { Banner, Container, Content } from './styles.js';

export function Home() {
  return (
    <main>
      <Banner>
        <h1>Seja Bem Vindo !</h1>
      </Banner>
      <Container>
        <Content>
          <CategoriesCarousel />
          <OffersCarousel />
        </Content>
      </Container>
    </main>
  );
}
