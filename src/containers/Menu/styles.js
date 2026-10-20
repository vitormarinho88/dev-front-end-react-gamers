import styled from 'styled-components';
import BannerMenu from '../../assets/gpu-menu.png';



export const Container = styled.div`
  width: 100%;
  min-height:100vh;
  background-color:#f0f0f0;


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
    font-family: 'Road Range' sans-serif;
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


`;

export const ProductsContainer = styled.div`


`;

