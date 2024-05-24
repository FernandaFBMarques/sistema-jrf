import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import InputField from '../componentes/Input/InputField.js';
import MyButton from '../componentes/Mybutton.js';
import 'primereact/resources/themes/saga-blue/theme.css'; // ou qualquer outro tema que você esteja usando
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/customStyles.css';


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
      <h1>Funcionários</h1>
      <h2>Editar ou Criar Funcionários</h2>

      <div class="formgrid grid">
        <div class="field col-15 md:col-3">
          <InputField id="nome" label="Nome" value={nome} onChange={setNome} />
        </div>
        <div class="field col-15 md:col-3 ">
          <InputField id="cpf" label="CPF" value={cpf} onChange={setCpf} />
        </div>
        <div class="field col-15 md:col-3">
          <InputField id="telefone" label="Telefone" value={telefone} onChange={setTelefone} />
        </div>
        <div class="field col-15 md:col-3">
          <InputField id="email" label="Email" value={email} onChange={setEmail} />
        </div>
        <div class="field col-15 md:col-3">
          <InputField id="rua" label="Rua" value={rua} onChange={setRua} />
          </div>
        <div class="field col-15 md:col-3">
          <InputField id="numero" label="Número" value={numero} onChange={setNumero} />
          </div>
        <div class="field col-15 md:col-3">
          <InputField id="cidade" label="Cidade" value={cidade} onChange={setCidade} />
          </div>
        <div class="field col-15 md:col-3">
          <InputField id="bairro" label="Bairro" value={bairro} onChange={setBairro} />
        </div>
      </div>
  
      <div className="button-container">
        <MyButton label="Criar Novo Funcionario" onClick={handleCreateFuncionario} className="custom-button" />
        <MyButton label="Atualizar Funcionario" onClick={handleUpdateFuncionario} className="custom-button" />
        <MyButton label="Remover Funcionario" onClick={handleDeleteFuncionario} className="custom-button" />
      </div>

      <h2>Deletar Funcionário</h2>
      <div class="formgrid grid">
        
        <div class="field col-15 md:col-3 ">
          <InputField id="cpf" label="CPF" value={cpf} onChange={setCpf} />
        </div>
      </div>
      <MyButton label="Remover Funcionario" onClick={handleDeleteFuncionario} className="custom-button" />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Lista de Funcionários</h2>
      <MyButton label="Listar todos os Funcionários" onClick={handleGetFuncionarios} className="custom-button" />
      <div>
        <DataTable value={funcionarios} tableStyle={{ minWidth: '50rem' }}>
          <Column field="cpf" header="CPF" />
          <Column field="nome" header="Nome" />
          <Column field="telefone" header="Telefone" />
          <Column field="email" header="Email" />
          <Column field="rua" header="Rua" />
          <Column field="numero" header="Número" />
          <Column field="cidade" header="Cidade" />
          <Column field="bairro" header="Bairro" />
        </DataTable>
      </div>
    </div>
  );
}

export default Page1;

