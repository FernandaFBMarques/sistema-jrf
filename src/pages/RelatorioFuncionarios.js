import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RelatorioFuncionarios() {
  const [dependentes, setDependentes] = useState([]);
  const [relacionamentos, setRelacionamentos] = useState([]);
  const [vendedorMaisVendeu, setVendedorMaisVendeu] = useState(null);
  const [contadorMaisNotas, setContadorMaisNotas] = useState(null);
  const [vendedorMaisAtendimento, setVendedorMaisAtendimento] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dependentesResponse = await axios.get('http://localhost:8080/relatorios/analise-dependentes');
        const relacionamentosResponse = await axios.get('http://localhost:8080/relatorios/analise-auto-relacionamento');
        const vendedorMaisVendeuResponse = await axios.get('http://localhost:8080/relatorios/vendedor-mais-vendeu');
        const contadorMaisNotasResponse = await axios.get('http://localhost:8080/relatorios/contador-mais-notas');
        const vendedorMaisAtendimentoResponse = await axios.get('http://localhost:8080/relatorios/vendedor-mais-atendimento');

        setDependentes(dependentesResponse.data);
        setRelacionamentos(relacionamentosResponse.data);
        setVendedorMaisVendeu(vendedorMaisVendeuResponse.data);
        setContadorMaisNotas(contadorMaisNotasResponse.data);
        setVendedorMaisAtendimento(vendedorMaisAtendimentoResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos relatórios:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Relatório Funcionários</h1>
      <h2>Análise com Dependentes</h2>
      <ul>
        {dependentes.map((item, index) => (
          <li key={index}>
            Funcionário: {item.nomeFuncionario}, Dependente: {item.nomeDependente}
          </li>
        ))}
      </ul>
      <h2>Análise com Auto Relacionamento</h2>
      <ul>
        {relacionamentos.map((item, index) => (
          <li key={index}>
            Funcionário: {item.nomeFuncionario}, Gerente: {item.nomeGerente}
          </li>
        ))}
      </ul>
      <h2>Vendedor que Mais Vendeu</h2>
      {vendedorMaisVendeu && (
        <p>
          Vendedor: {vendedorMaisVendeu.nomeVendedor}, Total de Vendas: R$ {vendedorMaisVendeu.totalVendas.toFixed(2)}
        </p>
      )}
      <h2>Contador que Mais Gerou Nota Fiscal</h2>
      {contadorMaisNotas && (
        <p>
          Contador: {contadorMaisNotas.nomeContador}, Total de Notas: {contadorMaisNotas.totalNotas}
        </p>
      )}
      <h2>Vendedor que Mais Fez Atendimento</h2>
      {vendedorMaisAtendimento && (
        <p>
          Vendedor: {vendedorMaisAtendimento.nomeVendedor}, Total de Atendimentos: {vendedorMaisAtendimento.totalAtendimentos}
        </p>
      )}
    </div>
  );
}

export default RelatorioFuncionarios;
