import styled from 'styled-components';
import { Link } from 'react-router-dom';

const textoOpcoes = [
  { texto: 'FUNCIONARIOS', path: '/page1' },
  { texto: 'PRODUTOS', path: '/page2' },
  { texto: 'PEDIDOS', path: '/page3' },
  { texto: 'CLIENTES', path: '/page4' }
];

const Opcao = styled.li`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 5px;
  cursor: pointer;
  min-width: 120px;
`;

const Opcoes = styled.ul`
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #000; /* Ajuste de cor ao passar o mouse */
  }
`;

function OpcoesHeader() {
  return (
    <Opcoes>
      {textoOpcoes.map(({ texto, path }) => (
        <Opcao key={texto}>
          <StyledLink to={path}>
            <p>{texto}</p>
          </StyledLink>
        </Opcao>
      ))}
    </Opcoes>
  );
}

export default OpcoesHeader;
