import styled from "styled-components";

export const Container = styled.div `
    .carousel-item{
        padding-right: 40px;
    }

    

   padding-left: 40px;

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

export const ContainerItems = styled.div `
   background: url('${(props) => props.$imageUrl}');
   background-position: center;
   background-size: cover;
   border-radius: 30px;

   display: flex;
   align-items: center;
   padding: 20px 30px;
   width: 80%;
   height: 250px;
   


   p{
      color: #ffff;
      background-color: rgba(0,0,0,0.5);
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 20px;
      font-weight: bold;
      margin-top: 100px;
      margin-right: 80px;
   } 
`;