import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Clientes() {
  const [clientes, setClientes] = useState([]); 

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/clientes');
        setClientes(response.data); 
      } catch (error) {
        console.error('Erro ao buscar os clientes:', error);
      }
    };

    fetchClientes(); 
  }, []); 

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.cnpj}>
            {cliente.nomeLoja} - {cliente.cnpj} - {cliente.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
