import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import InputField from '../componentes/Input/InputField.js';
import MyButton from '../componentes/Mybutton.js';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/customStyles.css';

function Page4() {
  const [cnpj, setCnpj] = useState('');
  const [nomeLoja, setNomeLoja] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [tipoVarejo, setTipoVarejo] = useState(false);
  const [tipoBoutique, setTipoBoutique] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleGetClientes();
  }, []);

  const handleCreateCliente = async () => {
    try {
      const response = await fetch('http://localhost:8080/clientes/addCliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cnpj, nomeLoja, telefone, email, rua, numero, cidade, bairro, estado, tipoVarejo, tipoBoutique }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setError(null);
      handleGetClientes();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGetClientes = async () => {
    try {
      const response = await fetch('http://localhost:8080/clientes');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setClientes(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateCliente = async () => {
    try {
      const response = await fetch(`http://localhost:8080/clientes/updateCliente`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cnpj, nomeLoja, telefone, email, rua, numero, cidade, bairro, estado, tipoVarejo, tipoBoutique }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setError(null);
      handleGetClientes();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCliente = async () => {
    try {
      const response = await fetch(`http://localhost:8080/clientes/deleteCliente/${cnpj}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setError(null);
      handleGetClientes();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Clientes</h1>
      <h2>Editar ou Criar Clientes</h2>

      <div className="formgrid grid">
        <div className="field col-12 md:col-3">
          <InputField id="cnpj" label="CNPJ" value={cnpj} onChange={setCnpj} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="nomeLoja" label="Nome da Loja" value={nomeLoja} onChange={setNomeLoja} showButton={false} />
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
          <InputField id="estado" label="Estado" value={estado} onChange={setEstado} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <label>Tipo Varejo</label>
          <input type="checkbox" checked={tipoVarejo} onChange={(e) => setTipoVarejo(e.target.checked)} />
        </div>
        <div className="field col-12 md:col-3">
          <label>Tipo Boutique</label>
          <input type="checkbox" checked={tipoBoutique} onChange={(e) => setTipoBoutique(e.target.checked)} />
        </div>
      </div>

      <div className="button-container">
        <MyButton label="Criar Novo Cliente" onClick={handleCreateCliente} className="custom-button" />
        <MyButton label="Atualizar Cliente" onClick={handleUpdateCliente} className="custom-button" />
        <MyButton label="Remover Cliente" onClick={handleDeleteCliente} className="custom-button" />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Lista de Clientes</h2>
      <div>
        <DataTable value={clientes} tableStyle={{ minWidth: '50rem' }}>
          <Column field="cnpj" header="CNPJ" />
          <Column field="nomeLoja" header="Nome da Loja" />
          <Column field="telefone" header="Telefone" />
          <Column field="email" header="Email" />
          <Column field="rua" header="Rua" />
          <Column field="numero" header="Número" />
          <Column field="cidade" header="Cidade" />
          <Column field="bairro" header="Bairro" />
          <Column field="estado" header="Estado" />
          <Column field="tipoVarejo" header="Tipo Varejo" body={(rowData) => rowData.tipoVarejo ? 'Sim' : 'Não'} />
          <Column field="tipoBoutique" header="Tipo Boutique" body={(rowData) => rowData.tipoBoutique ? 'Sim' : 'Não'} />
        </DataTable>
      </div>
    </div>
  );
}

export default Page4;
