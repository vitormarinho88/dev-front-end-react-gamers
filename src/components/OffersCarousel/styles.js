import styled from "styled-components";

export const Container = styled.div `
    .carousel-item{
        padding-right: 40px;
    }

    overflow-x: hidden;
   
    .react-multi-carousel-list {
      overflow: visible;
   }

   
    
    padding-left: 40px;
    padding-bottom: 45px;

`;

export const Title = styled.h2 `
   font-size: 40px;
   font-weight: 800;
   color: #ebebeb;
   padding-bottom: 32px;
   position: relative;
   text-align: center;
   margin-bottom: 40px;
   margin-top: 20px;
   margin: 70px 0;

   &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 56px;
    height: 4px;
    background-color: #f8f3fa;
    left: calc(50% - 28px);
   }
`;

