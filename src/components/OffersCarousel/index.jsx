import { useEffect, useState } from 'react';
import CarouselModule from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { api } from '../../services/api';
import { Container, ContainerItems, Title } from './styles.js';

const Carousel = CarouselModule.default ?? CarouselModule;
console.log({ Carousel, Container, Title, ContainerItems });

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');

      
      console.log(data);
    }

    loadProducts();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Container>
      <Title>Ofertas do Dia</Title>

      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisible={false}
        itemClass="carousel-item"
      >
        {products.map((category) => (
          <ContainerItems key={category.id} $imageUrl={category.url}>
            <p>{category.name}</p>
          </ContainerItems>
        ))}
      </Carousel>
    </Container>
  );
}
