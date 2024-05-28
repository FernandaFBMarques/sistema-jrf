import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
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
  const [clt, setClt] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [matGerente, setMatGerente] = useState('');
  const [fkFuncionariosCpf, setFkFuncionariosCpf] = useState('');
  const [dependentes, setDependentes] = useState([{ nome: '', cpf: '' }]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCargo, setSelectedCargo] = useState('todos');
  const [tipoFuncionario, setTipoFuncionario] = useState('');

  useEffect(() => {
    handleGetFuncionarios();
  }, []);

  useEffect(() => {
    filterFuncionariosByCargo();
  }, [selectedCargo, funcionarios]);

  const cargos = [
    { label: 'Todos', value: 'todos' },
    { label: 'Contador', value: 'Contador' },
    { label: 'Equipe de Vendas', value: 'Equipe de Vendas' }
  ];

  const tiposFuncionario = [
    { label: 'Contador', value: 'contador' },
    { label: 'Equipe de Vendas', value: 'vendas' }
  ];

  const handleCreateFuncionario = async () => {
    try {
      const funcionarioData = {
        cpf,
        nome,
        telefone,
        email,
        rua,
        numero,
        cidade,
        bairro,
        cargo: tipoFuncionario === 'contador' ? 'Contador' : 'Equipe de Vendas' // Define o cargo baseado no tipo de funcionário
      };

      if (tipoFuncionario === 'contador') {
        funcionarioData.contador = { clt, dependentes };
      } else if (tipoFuncionario === 'vendas') {
        funcionarioData.equipeDeVendas = { fkFuncionariosCpf, cnpj, matGerente };
      }

      const response = await fetch('http://localhost:8080/funcionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionarioData),
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
      
      // Determine the cargo for each employee
      const funcionariosComCargo = data.map(funcionario => {
        if (funcionario.contador) {
          funcionario.cargo = 'Contador';
        } else if (funcionario.equipeDeVendas) {
          funcionario.cargo = 'Equipe de Vendas';
        } else {
          funcionario.cargo = 'Outro';
        }
        return funcionario;
      });

      setFuncionarios(funcionariosComCargo);
      setFilteredFuncionarios(funcionariosComCargo); // Inicialmente mostrar todos
      setError(null);
      console.log(funcionariosComCargo);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGetFuncionariosAtivos = async () => {
    try {
      const response = await fetch('http://localhost:8080/funcionarios?ativo=true');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const funcionariosComCargo = data.map(funcionario => {
        if (funcionario.contador) {
          funcionario.cargo = 'Contador';
        } else if (funcionario.equipeDeVendas) {
          funcionario.cargo = 'Equipe de Vendas';
        } else {
          funcionario.cargo = 'Outro';
        }
        return funcionario;
      });

      setFuncionarios(funcionariosComCargo);
      setFilteredFuncionarios(funcionariosComCargo); // Atualiza a lista filtrada
      setError(null);
      console.log(funcionariosComCargo);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGetFuncionariosInativos = async () => {
    try {
      const response = await fetch('http://localhost:8080/funcionarios?ativo=false');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const funcionariosComCargo = data.map(funcionario => {
        if (funcionario.contador) {
          funcionario.cargo = 'Contador';
        } else if (funcionario.equipeDeVendas) {
          funcionario.cargo = 'Equipe de Vendas';
        } else {
          funcionario.cargo = 'Outro';
        }
        return funcionario;
      });

      setFuncionarios(funcionariosComCargo);
      setFilteredFuncionarios(funcionariosComCargo); // Atualiza a lista filtrada
      setError(null);
      console.log(funcionariosComCargo);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateFuncionario = async () => {
    try {
      const funcionarioData = {
        nome,
        telefone,
        email,
        rua,
        numero,
        cidade,
        bairro,
        cargo: tipoFuncionario === 'contador' ? 'Contador' : 'Equipe de Vendas' // Define o cargo baseado no tipo de funcionário
      };

      if (tipoFuncionario === 'contador') {
        funcionarioData.contador = { clt, dependentes };
      } else if (tipoFuncionario === 'vendas') {
        funcionarioData.equipeDeVendas = { fkFuncionariosCpf, cnpj, matGerente };
      }

      const response = await fetch(`http://localhost:8080/funcionarios/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionarioData),
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

  const handleInativarFuncionario = async () => {
    try {
      const response = await fetch(`http://localhost:8080/funcionarios/inativar/${cpf}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(`Funcionario com CPF ${cpf} inativado com sucesso.`);
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

  const handleDependenteChange = (index, name, value) => {
    const newDependentes = [...dependentes];
    newDependentes[index] = { ...newDependentes[index], [name]: value };
    setDependentes(newDependentes);
  };

  return (
    <div>
      <h1>Funcionários</h1>
      <h2>Editar ou Criar Funcionários</h2>

      <div className="formgrid grid">
        <div className="field col-12 md:col-3">
          <InputField id="cpf" label="CPF" value={cpf} onChange={(value) => setCpf(value)} name="cpf" showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="nome" label="Nome" value={nome} onChange={(value) => setNome(value)} name="nome" showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="telefone" label="Telefone" value={telefone} onChange={(value) => setTelefone(value)} name="telefone" showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="email" label="Email" value={email} onChange={(value) => setEmail(value)} name="email" showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="rua" label="Rua" value={rua} onChange={(value) => setRua(value)} name="rua" showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="numero" label="Número" value={numero} onChange={(value) => setNumero(value)} name="numero" showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="cidade" label="Cidade" value={cidade} onChange={(value) => setCidade(value)} name="cidade" showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="bairro" label="Bairro" value={bairro} onChange={(value) => setBairro(value)} name="bairro" showButton={false} />
        </div>
      </div>

      <div className="formgrid grid col-12 md:col-3">
        <Dropdown value={tipoFuncionario} options={tiposFuncionario} onChange={(e) => setTipoFuncionario(e.value)} placeholder="Selecione o Tipo de Funcionário" />
      </div>

      {tipoFuncionario === 'vendas' && (
        <div>
          <div className="field col-12 md:col-3">
            <InputField id="fkFuncionariosCpf" label="CPF" value={fkFuncionariosCpf} onChange={(value) => setFkFuncionariosCpf(value)} name="fkFuncionariosCpf" showButton={false} />
          </div>
          <div className="field col-12 md:col-3">
            <InputField id="cnpj" label="CNPJ" value={cnpj} onChange={(value) => setCnpj(value)} name="cnpj" showButton={false} />
          </div>
          <div className="field col-12 md:col-3">
            <InputField id="mat_gerente" label="Matrícula do Gerente" value={matGerente} onChange={(value) => setMatGerente(value)} name="mat_gerente" showButton={false} />
          </div>
        </div>
      )}

      {tipoFuncionario === 'contador' && (
        <div>
          <div className="field col-12 md:col-3">
            <InputField id="fkFuncionariosCpf" label="CPF" value={fkFuncionariosCpf} onChange={(value) => setFkFuncionariosCpf(value)} name="fkFuncionariosCpf" showButton={false} />
          </div>
          <div className="field col-12 md:col-3">
            <InputField id="clt" label="CLT" value={clt} onChange={(value) => setClt(value)} name="clt" showButton={false} />
          </div>
          <div className="formgrid grid">
            <div className=" col-12 md:col-3">
              <h3>Adicione Dependentes:</h3>
            </div>
            {dependentes.map((dependente, index) => (
              <div key={index} className="formgrid grid">
                <div className="field col-12 md:col-6">
                  <InputField
                    id={`dependente-nome-${index}`}
                    label={`Nome do Dependente ${index + 1}`}
                    value={dependente.nome}
                    onChange={(value) => handleDependenteChange(index, 'nome', value)}
                    name="nome"
                    showButton={false}
                  />
                </div>
                <div className="field col-12 md:col-6">
                  <InputField
                    id={`dependente-cpf-${index}`}
                    label={`CPF do Dependente ${index + 1}`}
                    value={dependente.cpf}
                    onChange={(value) => handleDependenteChange(index, 'cpf', value)}
                    name="cpf"
                    showButton={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="button-container">
        <MyButton label="Criar Novo Funcionario" onClick={handleCreateFuncionario} className="custom-button" />
        <MyButton label="Atualizar Funcionario" onClick={handleUpdateFuncionario} className="custom-button" />
        <MyButton label="Inativar Funcionario" onClick={handleInativarFuncionario} className="custom-button" />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Lista de Funcionários</h2>
      <div className="flex-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Dropdown value={selectedCargo} options={cargos} onChange={(e) => setSelectedCargo(e.value)} placeholder="Selecione um Cargo" />
        <MyButton label="Listar Funcionários Ativos" onClick={handleGetFuncionariosAtivos} className="custom-button" />
        <MyButton label="Listar Funcionários Inativos" onClick={handleGetFuncionariosInativos} className="custom-button" />
        <MyButton label="Listar Todos os Funcionários" onClick={handleGetFuncionarios} className="custom-button" />
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
