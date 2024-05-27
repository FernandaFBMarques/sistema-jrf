import { Link } from 'react-router-dom';
import home from '../../imagens/home.svg';
import styled from 'styled-components';

const icones = [
  { src: home, path: '/' }, 
];

const Icone = styled.li`
  margin-right: 40px;
  width: 25px;
`;

const Icones = styled.ul`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
`;

function IconesHeader() {
  return (
    <Icones>
      {icones.map((icone, index) => (
        <Icone key={index}>
          <StyledLink to={icone.path}>
            <img src={icone.src} alt="Ícone" />
          </StyledLink>
        </Icone>
      ))}
    </Icones>
  );
}

export default IconesHeader;
