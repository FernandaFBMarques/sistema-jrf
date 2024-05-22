import React, { useState } from 'react';

function Page1() {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [funcionarios, setFuncionarios] = useState([]);
  const [error, setError] = useState(null);

  // Criar Funcionario
  const handleCreateFuncionario = async () => {
    try {
      const response = await fetch('http://localhost:8080/funcionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, nome, telefone, email, rua, numero, cidade, bairro }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setError(null);
      handleGetFuncionarios(); // Atualiza a lista após criar um funcionário
    } catch (error) {
      setError(error.message);
    }
  };

  // Obter todos os Funcionarios
  const handleGetFuncionarios = async () => {
    try {
      const response = await fetch('http://localhost:8080/funcionarios');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFuncionarios(data);
      setError(null);
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Atualizar Funcionario
  const handleUpdateFuncionario = async () => {
    try {
      const response = await fetch(`http://localhost:8080/funcionarios/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, telefone, email, rua, numero, cidade, bairro }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setError(null);
      console.log(data);
      handleGetFuncionarios(); // Atualiza a lista após atualizar um funcionário
    } catch (error) {
      setError(error.message);
    }
  };

  // Deletar Funcionario
  const handleDeleteFuncionario = async () => {
    try {
      const response = await fetch(`http://localhost:8080/funcionarios/${cpf}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(`Funcionario com CPF ${cpf} deletado com sucesso.`);
      setError(null);
      handleGetFuncionarios(); // Atualiza a lista após deletar um funcionário
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Page 1</h1>

      <div>
        <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} />
        <input type="number" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
        <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
      </div>

      <button onClick={handleCreateFuncionario}>Create Funcionario</button>
      <button onClick={handleGetFuncionarios}>Get Funcionarios</button>
      <button onClick={handleUpdateFuncionario}>Update Funcionario</button>
      <button onClick={handleDeleteFuncionario}>Delete Funcionario</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Lista de Funcionarios</h2>
      <ul>
        {funcionarios.map((func) => (
          <li key={func.cpf}>
            {func.cpf}: {func.nome}, {func.telefone}, {func.email}, {func.rua}, {func.numero}, {func.cidade}, {func.bairro}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page1;
