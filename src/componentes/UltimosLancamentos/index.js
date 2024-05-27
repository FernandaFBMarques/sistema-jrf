import styled from 'styled-components';
import CardRelatorioFuncionarios from '../CardRelatorioFuncionarios';
import CardRelatorioClientes from '../CardRelatorioClientes';
import CardRelatorioProdutos from '../CardRelatorioProdutos';
import CardRelatorioVenda from '../CardRelatorioVenda';

const UltimosLancamentosContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
    background: linear-gradient(90deg, #002f52 35%, #326589 165%);
    margin-bottom: 50px;
`;

const CardWrapper = styled.div`
    flex: 1 1 45%; 
    margin: 10px;
    max-width: 45%;
`;

function UltimosLancamentos() {
    return (
        <UltimosLancamentosContainer>
            <CardWrapper>
                <CardRelatorioFuncionarios
                    titulo="Relatório Funcionarios"
                    subtitulo="Funcionários que mais venderam"
                    descricao="Veja o desempenho dos funcionários"
                />
            </CardWrapper>
            <CardWrapper>
                <CardRelatorioClientes
                    titulo="Relatório Clientes"
                    subtitulo="Clientes que mais compraram"
                    descricao="Veja os detalhes dos clientes que mais compraram"
                />
            </CardWrapper>
            <CardWrapper>
                <CardRelatorioProdutos
                    titulo="Relatório Produtos"
                    subtitulo="Produtos mais vendidos"
                    descricao="Lista de produtos mais vendidos"
                />
            </CardWrapper>
            <CardWrapper>
                <CardRelatorioVenda
                    titulo="Relatório Venda"
                    subtitulo="Vendas"
                    descricao="Veja o desempenho da equipe"
                />
            </CardWrapper>
        </UltimosLancamentosContainer>
    );
}

export default UltimosLancamentos;
