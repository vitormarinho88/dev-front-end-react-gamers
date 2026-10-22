import styled from 'styled-components';
import BannerMenu from '../../assets/gpu-menu.png';
import BackgroundGamer from '../../assets/background_441450_purple_lines.png';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  min-height:100vh;
  background-color:#f0f0f0;
  background:url('${BackgroundGamer}');

`;

export const Banner = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 width: 100%;
 height: 480px;
 position: relative;

 background: url('${BannerMenu}');
 background-color: #1f1f1f;
 background-position: center;
 background-size: cover;

  h1{
    font-family: 'Road Rage', sans-serif;
    font-size: 50px;
    line-height: 60px;
    position: absolute;
    color: #fff;

   right: 20%;
   top: 30%

   span{
    display: block;
    color: #fff;
    font-size: 20px;
   }
     
    
  }

`;

export const CategoryMenu = styled.div`
 display: flex;
 justify-content: center;
 gap: 50px;
 margin-top: 30px;
`;

export const CategoryButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  background: none;
  color: #3b9732;
  font-size: 28px;
  font-weight: 800;
  padding-bottom: 5px;
  line-height: 20px;
  border-bottom: 4px solid #26db0e;
 
`;


export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px;
  gap: 90px;
  justify-content: center;
  max-width: 1280px;
  margin: 50px auto;
`;

