import React from 'react';
import UltimosLancamentos from '../componentes/UltimosLancamentos';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
  gap: 10px; 
  background-image: linear-gradient(90deg, #002F52 45%, #326589 165%);
`;

function Home() {
  return (
    <HomeContainer>
      <UltimosLancamentos />
    </HomeContainer>
  );
}

export default Home;
