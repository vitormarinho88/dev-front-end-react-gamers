import VectorEsquerda from '../../assets/Vector-esquerda.svg';

import { ContainerButton } from './styles.js';

export function ReturnButton({ ...props }) {
  return (
    <ContainerButton {...props}>
      <img src={VectorEsquerda} alt="voltar" />
    </ContainerButton>
  );
}
