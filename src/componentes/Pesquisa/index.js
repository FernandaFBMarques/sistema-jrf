import React, { useState } from 'react';
import InputField from '../Input/InputField'; // Certifique-se de que o caminho está correto
import styled from 'styled-components';
import { produto } from './dadosPesquisa';

const PesquisaContainer = styled.section`
    background-image: linear-gradient(90deg, #002f52 35%, #326589 165%);
    color: #FFF;
    text-align: center;
    padding: 50px 0; /* Reduzir padding */
    width: 100%;
    box-sizing: border-box; /* Garantir que padding seja incluído no tamanho total */
`;

const Titulo = styled.h2`
    color: #FFF;
    font-size: 32px; /* Ajustar tamanho da fonte */
    margin: 0; /* Remover margens */
`;

const Subtitulo = styled.h3`
    font-size: 18px; /* Ajustar tamanho da fonte */
    font-weight: 500;
    margin-bottom: 20px; /* Reduzir margem inferior */
`;

const ResultadoContainer = styled.div`
    display: flex;
    flex-direction: column; /* Exibir resultados em coluna */
    align-items: center; /* Centralizar itens */
`;

const Resultado = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px; /* Reduzir margem inferior */
    cursor: pointer;
    padding: 10px; /* Adicionar padding */
    width: 80%; /* Definir largura */
    max-width: 600px; /* Definir largura máxima */
    background-color: rgba(255, 255, 255, 0.1); /* Fundo semi-transparente */
    border-radius: 8px; /* Bordas arredondadas */
    transition: background-color 0.3s ease;

    p {
        margin: 0; /* Remover margens */
        padding: 0 10px; /* Adicionar padding lateral */
        flex: 1; /* Permitir que o texto ocupe o espaço restante */
        text-align: left; /* Alinhar texto à esquerda */
    }

    img {
        width: 80px; /* Reduzir largura da imagem */
        height: auto; /* Manter proporção da imagem */
        border-radius: 4px; /* Bordas arredondadas */
    }
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.2); /* Alterar cor de fundo ao passar o mouse */
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
            <Subtitulo>Encontre sua venda aqui.</Subtitulo>
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
