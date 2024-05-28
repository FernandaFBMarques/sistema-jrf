import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
      <DataTable value={dependentes} stripedRows>
        <Column field="nomeFuncionario" header="Funcionário"></Column>
        <Column field="nomeDependente" header="Dependente"></Column>
      </DataTable>

      <h2>Análise com Auto Relacionamento</h2>
      <DataTable value={relacionamentos} stripedRows>
        <Column field="nomeFuncionario" header="Funcionário"></Column>
        <Column field="nomeGerente" header="Gerente"></Column>
      </DataTable>

      <h2>Vendedor que mais vendeu</h2>
      {vendedorMaisVendeu && (
        <Card>
          <p><strong>Vendedor</strong>: {vendedorMaisVendeu.nomeVendedor}</p>
          <p><strong>Total de Vendas</strong>: R$ {vendedorMaisVendeu.totalVendas.toFixed(2)}</p>
        </Card>
      )}

      <h2>Contador que mais gerou Nota Fiscal</h2>
      {contadorMaisNotas && (
        <Card>
          <p><strong>Contador</strong>: {contadorMaisNotas.nomeContador}</p>
          <p><strong>Total de Notas</strong>: {contadorMaisNotas.totalNotas}</p>
        </Card>
      )}

      <h2>Vendedor que mais fez Atendimento</h2>
      {vendedorMaisAtendimento && (
        <Card>
          <p><strong>Vendedor</strong>: {vendedorMaisAtendimento.nomeVendedor}</p>
          <p><strong>Total de Atendimentos</strong>: {vendedorMaisAtendimento.totalAtendimentos}</p>
        </Card>
      )}
    </div>
  );
}

export default RelatorioFuncionarios;
