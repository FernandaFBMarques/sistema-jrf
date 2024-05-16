import Header from './componentes/Header';
import Pesquisa from './componentes/Pesquisa';
import styled from 'styled-components';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg, #002F52 45%, #326589 165%);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
`

function App() {
  return (
    <AppContainer>
      <Header/>
      <Pesquisa/>
    </AppContainer>
  );
}

export default App;