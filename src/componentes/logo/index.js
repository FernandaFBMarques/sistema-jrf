import logo from '../../imagens/logo.svg';
import styled from 'styled-components';

const LogoContainer = styled.div`
    display: flex;
    font-size: 30px;
`
const LogoImage = styled.img`
    margin-right: 10px;
`

function Logo() {
    return(
        <LogoContainer>
            <LogoImage 
                src={logo} 
                alt='logo da empresa JRF como o anagrama homônimo em azul escuro' 
            />
            <p>Gestora de Marcas</p>
      </LogoContainer>
    )
}

export default Logo