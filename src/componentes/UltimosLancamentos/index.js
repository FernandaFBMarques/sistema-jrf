import { produtos } from './dadosUltimosLancamentos';
import { Titulo } from '../Titulo';
import CardRelatorioFuncionarios from '../CardRelatorioFuncionarios';
import CardRelatorioClientes from '../CardRelatorioClientes';
import CardRelatorioProdutos from '../CardRelatorioProdutos';
import CardRelatorioVenda from '../CardRelatorioVenda';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const UltimosLancamentosContainer = styled.section`
    background-color: linear-gradient(90deg, #002f52 35%, #326589 165%);
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px; 
    max-height: 900px; 
    overflow-y: auto; 
`;

const NovosProdutosContainer = styled.div`
   margin-top: 50px; 
   display: flex;
   justify-content: center;
   gap: 10px; 
   flex-wrap: wrap; 
   cursor: pointer;

   img{
    width: 150px; 
   }
`;

const produtoSelecionado = produtos.find(produto => produto.id === 1);

function UltimosLancamentos() {
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate('/relatorio-funcionarios');
    };

    return (
        <UltimosLancamentosContainer>
            <Titulo 
                cor="#EB9B00"
                tamanhoFonte="30px" 
            >
                ÚLTIMOS LANÇAMENTOS
            </Titulo>
            <NovosProdutosContainer>
                {produtos.map(produto => (
                    <img key={produto.id} src={produto.src} alt={produto.alt} />
                ))} 
            </NovosProdutosContainer> 
            <CardRelatorioFuncionarios
                titulo="Relatório Funcionarios"
                subtitulo="Funcionários que mais venderam"
                descricao="Veja os funcionários que mais venderam."
            />
            <CardRelatorioClientes
                titulo="Relatório Clientes"
                subtitulo="Clientes que mais compraram"
                descricao="Veja os clientes que mais compraram."
            />
            <CardRelatorioProdutos
                titulo="Relatório Produtos"
                subtitulo="Produtos mais vendidos"
                descricao="Lista de produtos mais vendidos."
            />
            <CardRelatorioVenda
                titulo="Relatório Venda"
                subtitulo="Vendas"
                descricao="Total de vendas e desempenho da equipe."
            />
        </UltimosLancamentosContainer>
    );
}

export default UltimosLancamentos;
