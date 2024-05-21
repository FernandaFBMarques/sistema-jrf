import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]); // Estado para armazenar a lista de funcionários

  useEffect(() => {
    // Função para buscar os funcionários do servidor
    const fetchFuncionarios = async () => {
      try {
        // Substitua 'http://localhost:8080/funcionarios' pelo seu URL correto
        const response = await axios.get('http://localhost:8080/funcionarios');
        setFuncionarios(response.data); // Atualiza o estado com a lista de funcionários
      } catch (error) {
        console.error('Erro ao buscar os funcionários:', error);
      }
    };

    fetchFuncionarios(); // Chama a função ao carregar o componente
  }, []); // O array vazio garante que o efeito é executado apenas uma vez após o componente ser montado

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
