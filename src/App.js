import Funcionarios from './componentes/Funcionarios';
import Header from './componentes/Header';
import Pesquisa from './componentes/Pesquisa';
import UltimosLancamentos from './componentes/UltimosLancamentos';
import styled from 'styled-components';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg, #002F52 45%, #326589 165%);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`

function App() {
  return (
    <AppContainer>
      <Header />
      <Pesquisa />
      <UltimosLancamentos />
      <Funcionarios/>
    </AppContainer>
  );
}

export default App;