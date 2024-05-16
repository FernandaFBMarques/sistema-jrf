import Input from '../Input'
import styled from 'styled-components'
import { useState } from 'react'
import { produto } from './dadosPesquisa'

const PesquisaContainer = styled.section`
    background-image: linear-gradient(90deg, #002f52 35%, #326589 165%);
    color: #FFF;
    text-align: center;
    padding: 85px 0;
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
    margin-bottom: 40px;
`
const Resultado = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-bottom: 40px;
   cursor: pointer;

   p {
       width: 200px;
   }

   img {
       width: 100px;
   }
   
   &:hover {
       border: 1px solid white;
   }
`

function Pesquisa() {
    const [produtosPesquisados, setProdutosPesquisados] = useState([])

    return(
        <PesquisaContainer>
            <Titulo>Já sabe por onde começar?</Titulo>
            <Subtitulo>Encontre sua venda aqui.</Subtitulo>
            <Input
                placeholder="Escreva aqui"
                onBlur={evento => {
                    const textoDigitado = evento.target.value
                    const resultadoPesquisa = produto.filter( produto => produto.nome.includes(textoDigitado))
                    setProdutosPesquisados(resultadoPesquisa) 
                }}
            />
            {produtosPesquisados.map( produto => (
                <Resultado>
                    <img src={produto.src}/>
                    <p>{produto.nome}</p>
                </Resultado>
            ) ) }
        </PesquisaContainer>
    )
}

export default Pesquisa