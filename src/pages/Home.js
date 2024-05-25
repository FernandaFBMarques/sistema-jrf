import React from 'react';
import Pesquisa from '../componentes/Pesquisa';
import UltimosLancamentos from '../componentes/UltimosLancamentos';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
  gap: 20px; 
`;

function Home() {
  return (
    <HomeContainer>
      <Pesquisa />
      <UltimosLancamentos />
    </HomeContainer>
  );
}

export default Home;
