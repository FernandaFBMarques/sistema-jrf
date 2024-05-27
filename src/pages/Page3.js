import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from 'styled-components';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
  gap: 10px;
  background-image: linear-gradient(90deg, #002f52 45%, #326589 165%);
`;

const fetchSales = async () => {

  return [
    {
      id: 1,
      saleNumber: '001',
      customer: 'Cliente A',
      salesTeam: 'Equipe 1',
      total: 100.0,
      products: [
        { id: 1, name: 'Produto 1', price: 50.0 },
        { id: 2, name: 'Produto 2', price: 50.0 },
      ],
    },
    {
      id: 2,
      saleNumber: '002',
      customer: 'Cliente B',
      salesTeam: 'Equipe 2',
      total: 200.0,
      products: [
        { id: 3, name: 'Produto 3', price: 100.0 },
        { id: 4, name: 'Produto 4', price: 100.0 },
      ],
    },
  ];
};

function Page3() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      const salesData = await fetchSales();
      setSales(salesData);
    };

    getSales();
  }, []);

  const rowExpansionTemplate = (data) => {
    return (
      <div>
        <h5>Produtos da Venda {data.saleNumber}</h5>
        <DataTable value={data.products}>
          <Column field="name" header="Produto"></Column>
          <Column field="price" header="Preço"></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <PageContainer>
      <h1>Vendas</h1>
      <DataTable value={sales} expandedRows={[]} rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
        <Column expander style={{ width: '3em' }} />
        <Column field="saleNumber" header="Número da Venda" />
        <Column field="customer" header="Cliente" />
        <Column field="salesTeam" header="Equipe de Vendas" />
        <Column field="total" header="Total" />
      </DataTable>
    </PageContainer>
  );
}

export default Page3;
