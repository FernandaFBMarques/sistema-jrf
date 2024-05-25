import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]); 

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/funcionarios');
        setFuncionarios(response.data); 
      } catch (error) {
        console.error('Erro ao buscar os funcionários:', error);
      }
    };

    fetchFuncionarios(); 
  }, []); 

  return (
    <div>
      <h1>Lista de Funcionários</h1>
      <ul>
        {funcionarios.map(funcionario => (
          <li key={funcionario.id}>
            {funcionario.nome} - {funcionario.cpf} - {funcionario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Funcionarios;
