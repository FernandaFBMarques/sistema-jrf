import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Funcionarios from './componentes/Funcionarios';
import Header from './componentes/Header';
import Pesquisa from './componentes/Pesquisa';
import UltimosLancamentos from './componentes/UltimosLancamentos';
import styled from 'styled-components';

// Importar as novas páginas
import Home from './pages/Home';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

//Importar componentes
import PageLayout from './componentes/PageGeneral/PageLayout';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, #002F52 45%, #326589 165%);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<PageLayout><Home /></PageLayout>} />
          <Route path="/page1" element={<PageLayout><Page1 /></PageLayout>} />
          <Route path="/page2" element={<PageLayout><Page2 /></PageLayout>} />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
