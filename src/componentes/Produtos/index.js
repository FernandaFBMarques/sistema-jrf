import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>
            {produto.nomeProduto} - {produto.codigoDeBarras} - {produto.preco}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Produtos;
