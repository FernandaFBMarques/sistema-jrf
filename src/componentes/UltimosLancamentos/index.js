import { produtos } from './dadosUltimosLancamentos';
import { Titulo } from '../Titulo';
import CardContas from '../CardContas';
import imagemTenis from '../../imagens/TenisOlympikusCorre3.png';
import styled from 'styled-components';

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
            <CardContas
                titulo="Talvez você se interesse por"
                subtitulo={produtoSelecionado.nome}
                descricao="Um dos melhores tênis de corrida do mercado"
                img={imagemTenis}
            />
        </UltimosLancamentosContainer>
    );
}

export default UltimosLancamentos;
