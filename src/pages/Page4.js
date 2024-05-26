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

const fetchCustomers = async () => {
  // Simular a chamada de uma API para buscar dados de clientes
  return [
    {
      cnpj: '12345678000100',
      name: 'Loja A',
      phones: ['123456789', '987654321'],
      emails: ['contato@lojaa.com.br'],
      address: {
        street: 'Rua A',
        number: '123',
        city: 'Cidade A',
        neighborhood: 'Bairro A',
        state: 'Estado A',
      },
      type: 'Varejo',
    },
    {
      cnpj: '98765432000100',
      name: 'Loja B',
      phones: ['555555555'],
      emails: ['contato@lojab.com.br', 'vendas@lojab.com.br'],
      address: {
        street: 'Rua B',
        number: '456',
        city: 'Cidade B',
        neighborhood: 'Bairro B',
        state: 'Estado B',
      },
      type: 'Boutique',
    },
  ];
};

function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      const customersData = await fetchCustomers();
      setCustomers(customersData);
    };

    getCustomers();
  }, []);

  const rowExpansionTemplate = (data) => {
    return (
      <div>
        <h5>Detalhes do Cliente {data.name}</h5>
        <div><strong>CNPJ:</strong> {data.cnpj}</div>
        <div><strong>Telefones:</strong> {data.phones.join(', ')}</div>
        <div><strong>E-mails:</strong> {data.emails.join(', ')}</div>
        <div><strong>Endereço:</strong> {`${data.address.street}, ${data.address.number}, ${data.address.neighborhood}, ${data.address.city} - ${data.address.state}`}</div>
        <div><strong>Tipo:</strong> {data.type}</div>
      </div>
    );
  };

  return (
    <PageContainer>
      <h1>Clientes</h1>
      <DataTable value={customers} expandedRows={[]} rowExpansionTemplate={rowExpansionTemplate} dataKey="cnpj">
        <Column expander style={{ width: '3em' }} />
        <Column field="name" header="Nome da Loja" />
        <Column field="cnpj" header="CNPJ" />
        <Column field="type" header="Tipo" />
      </DataTable>
    </PageContainer>
  );
}

export default CustomersPage;
