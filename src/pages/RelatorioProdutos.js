import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <ul>
        {produtosMaisVendidos.map((produto, index) => (
          <li key={index}>
            Produto: {produto.nomeProduto}, Total de Vendas: {produto.totalVendas}
          </li>
        ))}
      </ul>
      <h2>Lista de Produtos Mais Vendidos por Estado</h2>
      <ul>
        {produtosMaisVendidosPorEstado.map((produto, index) => (
          <li key={index}>
            Estado: {produto.estado}, Produto: {produto.nomeProduto}, Total de Vendas: {produto.totalVendas}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RelatorioProdutos;
