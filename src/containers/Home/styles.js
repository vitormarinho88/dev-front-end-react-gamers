import styled from 'styled-components';
import BannerGamer from '../../assets/nintendo_gradient.png'
import BackgroundGamer from '../../assets/background_441450_purple_lines.png';


export const Banner = styled.div`
  background: url('${BannerGamer}');
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  height: 350px;

  h1{
    font-family: 'Road Rage', sans-serif;
    color: #fff;
    font-size: 50px;
    color: #fdfdfd;
    position: absolute;
    right: 5%;
    top: 10%;
  }
`;

export const Container = styled.section`
 background: linear-gradient(rgba(255, 255, 255, 0.6))
                            ,rgba(255, 255, 255, 0.6);
 
 background:url('${BackgroundGamer}');
 
 

 
 height: 600px;

`;

export const Content = styled.div`
  padding-bottom: 70px;
  


`