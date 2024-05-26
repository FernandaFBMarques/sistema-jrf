import React, { useState } from 'react';
import InputField from '../Input/InputField'; 
import styled from 'styled-components';
import { produto } from './dadosPesquisa';

const PesquisaContainer = styled.section`
    background-image: linear-gradient(90deg, #002f52 35%, #326589 165%);
    color: #FFF;
    text-align: center;
    padding: 50px 0;
    width: 100%;
    box-sizing: border-box; 
`;

const Titulo = styled.h2`
    color: #FFF;
    font-size: 40px; 
    margin: 0; 
`;

const Subtitulo = styled.h3`
    font-size: 22px; 
    font-weight: 500;
    margin-bottom: 20px;
`;

const ResultadoContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center; 
`;

const Resultado = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px; 
    cursor: pointer;
    padding: 10px; 
    width: 80%; 
    max-width: 600px; 
    background-color: rgba(255, 255, 255, 0.1); 
    border-radius: 8px; 
    transition: background-color 0.3s ease;

    p {
        margin: 0; 
        padding: 0 10px; 
        flex: 1;
        text-align: left; 
    }

    img {
        width: 80px; 
        height: auto;
        border-radius: 4px;
    }
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

function Pesquisa() {
    const [textoPesquisa, setTextoPesquisa] = useState('');
    const [produtosPesquisados, setProdutosPesquisados] = useState([]);

    const handlePesquisa = (textoDigitado) => {
        setTextoPesquisa(textoDigitado);
        const resultadoPesquisa = produto.filter(produto => produto.nome.includes(textoDigitado));
        setProdutosPesquisados(resultadoPesquisa);
    };

    return (
        <PesquisaContainer>
            <Titulo>Já sabe por onde começar?</Titulo>
            <Subtitulo>Encontre seu produto aqui.</Subtitulo>
            <InputField
                id="pesquisa"
                label="Escreva aqui"
                value={textoPesquisa}
                onChange={handlePesquisa}
                showButton={true}
            />
            <ResultadoContainer>
                {produtosPesquisados.map(produto => (
                    <Resultado key={produto.id}>
                        <img src={produto.src} alt={produto.alt} />
                        <p>{produto.nome}</p>
                    </Resultado>
                ))}
            </ResultadoContainer>
        </PesquisaContainer>
    );
}

export default Pesquisa;
