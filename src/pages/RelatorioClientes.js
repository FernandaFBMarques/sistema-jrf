import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <ul>
        {clientes.map((cliente, index) => (
          <li key={index}>
            {cliente.nomeLoja}: R$ {cliente.totalCompras.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RelatorioClientes;
