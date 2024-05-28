import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function RelatorioClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/relatorios/clientes-mais-compraram');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos clientes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Relatório Clientes</h1>
      <h2>Clientes que mais compraram</h2>
      <div className="card">
        <DataTable value={clientes} stripedRows>
          <Column field="nomeLoja" header="NOME DA LOJA"></Column>
          <Column field="totalCompras" header="TOTAL DE COMPRAS R$" body={(rowData) => rowData.totalCompras.toFixed(2)}></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default RelatorioClientes;
