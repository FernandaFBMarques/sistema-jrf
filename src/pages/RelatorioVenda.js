import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledCard = styled(Card)`
  flex: 1;
  min-width: 300px;
  margin: 10px;
`;

function RelatorioVenda() {
  const [totalVendasSemImposto, setTotalVendasSemImposto] = useState(0);
  const [totalVendasComImposto, setTotalVendasComImposto] = useState(0);
  const [vendasPorMembro, setVendasPorMembro] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalSemImpostoResponse = await axios.get('http://localhost:8080/relatorios/total-vendas-sem-imposto');
        const totalComImpostoResponse = await axios.get('http://localhost:8080/relatorios/total-vendas-com-imposto');
        const vendasPorMembroResponse = await axios.get('http://localhost:8080/relatorios/vendas-por-membro');

        setTotalVendasSemImposto(totalSemImpostoResponse.data);
        setTotalVendasComImposto(totalComImpostoResponse.data);
        setVendasPorMembro(vendasPorMembroResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos relatórios:', error);
      }
    };

    fetchData();
  }, []);

  const nomeGerenteTemplate = (rowData) => {
    return rowData.nomeGerente ? rowData.nomeGerente : 'Gerente';
  };

  return (
    <div>
      <h1>Relatório Vendas</h1>
      <CardContainer>
        <StyledCard title="Total de vendas sem imposto">
          <p className="p-m-0">{totalVendasSemImposto}</p>
        </StyledCard>
        <StyledCard title="Total de vendas com imposto">
          <p className="p-m-0">{totalVendasComImposto}</p>
        </StyledCard>
      </CardContainer>
      <h2>Vendas por membro da equipe:</h2>
      <DataTable value={vendasPorMembro} stripedRows>
        <Column field="nomeVendedor" header="VENDEDOR" />
        <Column field="totalVendas" header="TOTAL DE VENDAS" />
        <Column field="totalImpostos" header="TOTAL DE IMPOSTOS" />
        <Column field="nomeGerente" header="GERENTE" body={nomeGerenteTemplate} />
      </DataTable>
    </div>
  );
}

export default RelatorioVenda;
