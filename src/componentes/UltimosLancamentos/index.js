import { produtos } from './dadosUltimosLancamentos'
import { Titulo } from '../Titulo'
import CardContas from '../CardContas'
import imagemTenis from '../../imagens/TenisOlympikusCorre3.png'
import styled from 'styled-components'

const UltimosLancamentosContainer = styled.section`
    background-color: #EBECEE;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    margin-botton: 40px;
`

const NovosLivrosContainer = styled.div`
   margin-top: 50px;
   display: flex;
   width: 100%;
   justify-content: center;
   cursor: pointer;

   img{
    width: 400px;
   }
`

function UltimosLancamentos() {
    return(
        <UltimosLancamentosContainer>
            <Titulo 
                cor="#EB9B00"
                tamanhoFonte="36px"
            >
                ÚLTIMOS LANÇAMENTOS
            </Titulo>
            <NovosLivrosContainer>
                {produtos.map( produto => (
                    <img src = {produto.src}/>
                ))} 
            </NovosLivrosContainer> 
            <CardContas
                titulo="Talvez você se interesse por"
                subtitulo="Corre 2"
                descricao="Um dos melhores tênis de corrida do mercado"
                img={imagemTenis}
            />
        </UltimosLancamentosContainer>
    )
}

export default UltimosLancamentos