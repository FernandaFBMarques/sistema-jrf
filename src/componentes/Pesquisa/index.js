import Input from '../Input'
import styled from 'styled-components'
import { useState } from 'react'

const PesquisaContainer = styled.section`
    background-image: linear-gradient(90deg, #002f52 35%, #326589 165%);
    color: #FFF;
    text-align: center;
    padding: 85px;
    height: 270px;
    width: 100%;
`
const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
`
const Subtitulo = styled.h3`
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 10px;
`

function Pesquisa() {
    const [textoDigitado, setTextoDigitado] = useState('')
    return(
        <PesquisaContainer>
            <Titulo>Já sabe por onde começar?</Titulo>
            <Subtitulo>Encontre sua venda aqui.</Subtitulo>
            <Input
                placeholder="Escreva aqui"
                onBlur={evento => setTextoDigitado(evento.target.value)}
            />
            <p>{textoDigitado}</p>
        </PesquisaContainer>
    )
}

export default Pesquisa