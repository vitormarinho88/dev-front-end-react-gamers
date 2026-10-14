import styled from 'styled-components';
import BannerGamer from '../../assets/processador.jpg'
import BackgroundGamer from '../../assets/background-gamer.svg';


export const Banner = styled.div`
  background: url('${BannerGamer}');
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  height: 530px;
`;

export const Container = styled.section`
 background: linear-gradient(rgba(255, 255, 255, 0.6))
                            ,rgba(255, 255, 255, 0.6);
 
 background: url('${BackgroundGamer}');

 height: 500px;

`;

export const Content = styled.div`

`