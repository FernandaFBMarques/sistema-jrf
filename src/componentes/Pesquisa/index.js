import Input from '../Input'
import styled from 'styled-components'
import { useState } from 'react'
import { produtos } from './dadosPesquisa'

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
    const [produtosPesquisados, setProdutosPesquisados] = useState([])

    console.log(produtosPesquisados)

    return(
        <PesquisaContainer>
            <Titulo>Já sabe por onde começar?</Titulo>
            <Subtitulo>Encontre sua venda aqui.</Subtitulo>
            <Input
                placeholder="Escreva aqui"
                onBlur={evento => {
                    const textoDigitado = evento.target.value
                    const resultadoPesquisa = produtos.filter( produtos => produtos.nome.includes(textoDigitado))
                    setProdutosPesquisados(resultadoPesquisa) 
                }}
            />
        </PesquisaContainer>
    )
}

export default Pesquisa