import React, { useState, useEffect } from 'react'; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import InputField from '../componentes/Input/InputField.js';
import MyButton from '../componentes/Mybutton.js';
import 'primereact/resources/themes/saga-blue/theme.css'; 
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
  const [cargo, setCargo] = useState('');
  const [funcionarios, setFuncionarios] = useState([]);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCargo, setSelectedCargo] = useState('todos'); 

  useEffect(() => {
    handleGetFuncionarios();
  }, []);

  useEffect(() => {
    filterFuncionariosByCargo();
  }, [selectedCargo, funcionarios]);

  const cargos = [
    { label: 'Todos', value: 'todos' },
    { label: 'Contador', value: 'Contador' },
    { label: 'Equipe de Vendas', value: 'Equipe de Vendas' },
    { label: 'Dependente', value: 'Dependente' },
    { label: 'Outro', value: 'Outro' }
  ];

  const handleCreateFuncionario = async () => {
    try {
      const response = await fetch('http://localhost:8080/funcionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, nome, telefone, email, rua, numero, cidade, bairro, cargo }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setError(null);
      handleGetFuncionarios();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGetFuncionarios = async () => {
    try {
      const response = await fetch('http://localhost:8080/funcionarios');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFuncionarios(data);
      setSelectedCargo('todos');
      setError(null);
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateFuncionario = async () => {
    try {
      const response = await fetch(`http://localhost:8080/funcionarios/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, telefone, email, rua, numero, cidade, bairro, cargo }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setError(null);
      console.log(data);
      handleGetFuncionarios();
    } catch (error) {
      setError(error.message);
    }
  };

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
      handleGetFuncionarios();
    } catch (error) {
      setError(error.message);
    }
  };

  const filterFuncionariosByCargo = () => {
    if (selectedCargo !== 'todos') {
      const filtered = funcionarios.filter(func => func.cargo === selectedCargo);
      setFilteredFuncionarios(filtered);
    } else {
      setFilteredFuncionarios(funcionarios);
    }
  };  

  return (
    <div>
      <h1>Funcionários</h1>
      <h2>Editar ou Criar Funcionários</h2>

      <div className="formgrid grid">
        <div className="field col-12 md:col-3">
          <InputField id="nome" label="Nome" value={nome} onChange={setNome} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="cpf" label="CPF" value={cpf} onChange={setCpf} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="telefone" label="Telefone" value={telefone} onChange={setTelefone} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="email" label="Email" value={email} onChange={setEmail} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="rua" label="Rua" value={rua} onChange={setRua} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="numero" label="Número" value={numero} onChange={setNumero} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="cidade" label="Cidade" value={cidade} onChange={setCidade} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="bairro" label="Bairro" value={bairro} onChange={setBairro} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="cargo" label="Cargo" value={cargo} onChange={setCargo} showButton={false} />
        </div>
      </div>

      <div className="button-container">
        <MyButton label="Criar Novo Funcionario" onClick={handleCreateFuncionario} className="custom-button" />
        <MyButton label="Atualizar Funcionario" onClick={handleUpdateFuncionario} className="custom-button" />
        <MyButton label="Remover Funcionario" onClick={handleDeleteFuncionario} className="custom-button" />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Deletar Funcionário</h2>
      <div className="formgrid grid">
        <div className="field col-12 md:col-3">
          <InputField id="cpf" label="CPF" value={cpf} onChange={setCpf} showButton={false} />
        </div>
      </div>
      <MyButton label="Remover Funcionario" onClick={handleDeleteFuncionario} className="custom-button" />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Lista de Funcionários</h2>
      <div className="flex-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Dropdown value={selectedCargo} options={cargos} onChange={(e) => setSelectedCargo(e.value)} placeholder="Selecione um Cargo" />
        <MyButton label="Listar todos os Funcionários" onClick={handleGetFuncionarios} className="custom-button" />
      </div>

      <div>
        <DataTable value={filteredFuncionarios} tableStyle={{ minWidth: '50rem' }}>
          <Column field="cpf" header="CPF" />
          <Column field="nome" header="Nome" />
          <Column field="telefone" header="Telefone" />
          <Column field="email" header="Email" />
          <Column field="rua" header="Rua" />
          <Column field="numero" header="Número" />
          <Column field="cidade" header="Cidade" />
          <Column field="bairro" header="Bairro" />
          <Column field="cargo" header="Cargo" />
        </DataTable>
      </div>
    </div>
  );
}

export default Page1;
