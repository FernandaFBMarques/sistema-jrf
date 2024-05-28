import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function RelatorioProdutos() {
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
  const [produtosMaisVendidosPorEstado, setProdutosMaisVendidosPorEstado] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosMaisVendidosResponse = await axios.get('http://localhost:8080/relatorios/produtos-mais-vendidos');
        const produtosMaisVendidosPorEstadoResponse = await axios.get('http://localhost:8080/relatorios/produtos-mais-vendidos-por-estado');

        setProdutosMaisVendidos(produtosMaisVendidosResponse.data);
        setProdutosMaisVendidosPorEstado(produtosMaisVendidosPorEstadoResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos relatórios:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Relatório Produtos</h1>
      
      <h2>Lista de Produtos Mais Vendidos</h2>
      <DataTable value={produtosMaisVendidos} stripedRows>
        <Column field="nomeProduto" header="PRODUTO" />
        <Column field="totalVendas" header="TOTAL DE VENDAS" />
      </DataTable>
      
      <h2>Lista de Produtos Mais Vendidos por Estado</h2>
      <DataTable value={produtosMaisVendidosPorEstado} stripedRows>
        <Column field="estado" header="ESTADO" />
        <Column field="nomeProduto" header="PRODUTO" />
        <Column field="totalVendas" header="TOTAL DE VENDAS" />
      </DataTable>
    </div>
  );
}

export default RelatorioProdutos;
