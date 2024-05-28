import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h1>Relatório Vendas</h1>
      <p>Total de vendas sem imposto: {totalVendasSemImposto}</p>
      <p>Total de vendas com imposto: {totalVendasComImposto}</p>
      <h2>Vendas por membro da equipe:</h2>
      <ul>
        {vendasPorMembro.map((venda, index) => (
          <li key={index}>
            Vendedor: {venda.nomeVendedor}, Total de Vendas: {venda.totalVendas}, Total de Impostos: {venda.totalImpostos}, Gerente: {venda.nomeGerente}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RelatorioVenda;
