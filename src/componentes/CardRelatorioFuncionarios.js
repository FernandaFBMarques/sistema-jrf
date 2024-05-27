import styled from "styled-components";
import { Titulo } from "./Titulo";
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

const Card = styled.div`
   align-items: center;
   background-color: #FFF;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 10px;
   display: flex;
   margin: 0 auto;
   max-width: 600px;
   padding: 25px 20px;
   justify-content: space-around;
   width: 100%; 
   margin-top: 30px;
`;
const Botao = styled.button`
   background-color: #EB9B00;
   color: #FFF;
   padding: 10px 0px;
   font-size: 16px;
   border: none;
   font-weight: 900;
   display: block;
   text-align: center;
   width: 150px;
   &:hover {
       cursor: pointer;
   }
`;
const Descricao = styled.p`
   max-width: 300px;
`;
const Subtitulo = styled.h4`
   color: #002F52;
   font-size: 18px;
   font-weight: bold;
   margin: 15px 0;
`;

function CardRelatorioFuncionarios({ titulo, subtitulo, descricao }) {
   const navigate = useNavigate(); // Use o hook useNavigate

   const handleClick = () => {
       navigate('/relatorio-funcionarios'); // Navegue para a rota desejada
   };

   return (
       <Card>
           <div>
               <Titulo tamanhoFonte="16px" cor="#EB9B00" alinhamento="left">
                   {titulo}
               </Titulo>
               <Subtitulo>{subtitulo}</Subtitulo>
               <Descricao>{descricao}</Descricao>
           </div>
           <div>
               <Botao onClick={handleClick}>Saiba mais</Botao>
           </div>
       </Card>
   );
}

export default CardRelatorioFuncionarios;
