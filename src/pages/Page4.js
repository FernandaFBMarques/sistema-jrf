import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import styled from 'styled-components';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
  gap: 10px;
  background-image: linear-gradient(90deg, #002f52 45%, #326589 165%);
`;

const fetchCustomers = async () => {
  const response = await fetch('http://localhost:8080/clientes');
  return response.json();
};

const deleteCustomer = async (cnpj) => {
  await fetch(`http://localhost:8080/clientes/deleteCliente/${cnpj}`, {
    method: 'DELETE'
  });
};

const saveCustomer = async (customer, isEdit) => {
  const method = isEdit ? 'PUT' : 'POST';
  const endpoint = isEdit ? `http://localhost:8080/clientes/updateCliente` : 'http://localhost:8080/clientes/addCliente';
  await fetch(endpoint, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer)
  });
};

function Page4() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const getCustomers = async () => {
      const customersData = await fetchCustomers();
      setCustomers(customersData);
    };

    getCustomers();
  }, []);

  const openNew = () => {
    setSelectedCustomer({ cnpj: '', nomeLoja: '', telefone: '', email: '', rua: '', numero: '', cidade: '', bairro: '', estado: '', tipoVarejo: false, tipoBoutique: false, emails: [] });
    setIsDialogVisible(true);
  };

  const hideDialog = () => {
    setIsDialogVisible(false);
    setSelectedCustomer(null);
  };

  const saveCustomerHandler = async () => {
    await saveCustomer(selectedCustomer, !!selectedCustomer.cnpj);
    const customersData = await fetchCustomers();
    setCustomers(customersData);
    hideDialog();
  };

  const deleteCustomerHandler = async (cnpj) => {
    if (window.confirm('Você tem certeza que deseja deletar este cliente?')) {
      await deleteCustomer(cnpj);
      const customersData = await fetchCustomers();
      setCustomers(customersData);
    }
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div>
        <h5>Detalhes do Cliente {data.nomeLoja}</h5>
        <div><strong>CNPJ:</strong> {data.cnpj}</div>
        <div><strong>Telefones:</strong> {data.telefone}</div>
        <div><strong>E-mails:</strong> {data.emails.join(', ')}</div>
        <div><strong>Endereço:</strong> {`${data.rua}, ${data.numero}, ${data.bairro}, ${data.cidade} - ${data.estado}`}</div>
        <div><strong>Tipo:</strong> {data.tipoVarejo ? 'Varejo' : 'Boutique'}</div>
      </div>
    );
  };

  return (
    <PageContainer>
      <h1>Clientes</h1>
      <Button label="Novo Cliente" icon="pi pi-plus" onClick={openNew} />
      <DataTable value={customers} expandedRows={[]} rowExpansionTemplate={rowExpansionTemplate} dataKey="cnpj">
        <Column expander style={{ width: '3em' }} />
        <Column field="nomeLoja" header="Nome da Loja" />
        <Column field="cnpj" header="CNPJ" />
        <Column field="tipo" header="Tipo" />
        <Column body={(rowData) => (
          <Button icon="pi pi-trash" onClick={() => deleteCustomerHandler(rowData.cnpj)} />
        )} />
      </DataTable>

      <Dialog visible={isDialogVisible} style={{ width: '450px' }} header="Detalhes do Cliente" modal className="p-fluid" footer={() => (
        <React.Fragment>
          <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
          <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveCustomerHandler} />
        </React.Fragment>
      )} onHide={hideDialog}>
        <div className="p-field">
          <label htmlFor="nomeLoja">Nome da Loja</label>
          <InputText id="nomeLoja" value={selectedCustomer ? selectedCustomer.nomeLoja : ''} onChange={(e) => setSelectedCustomer({ ...selectedCustomer, nomeLoja: e.target.value })} required autoFocus />
        </div>
        <div className="p-field">
          <label htmlFor="cnpj">CNPJ</label>
          <InputText id="cnpj" value={selectedCustomer ? selectedCustomer.cnpj : ''} onChange={(e) => setSelectedCustomer({ ...selectedCustomer, cnpj: e.target.value })} required />
        </div>
        <div className="p-field">
          <label htmlFor="telefone">Telefone</label>
          <InputText id="telefone" value={selectedCustomer ? selectedCustomer.telefone : ''} onChange={(e) => setSelectedCustomer({ ...selectedCustomer, telefone: e.target.value })} required />
        </div>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={selectedCustomer ? selectedCustomer.email : ''} onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })} required />
        </div>
        <div className="p-field">
          <label htmlFor="rua">Rua</label>
          <InputText id="rua" value={selectedCustomer ? selectedCustomer.rua : ''} onChange={(e) => setSelectedCustomer({ ...selectedCustomer, rua: e.target.value })} required />
        </div>
        <div className="p-field">
          <label htmlFor="numero">Número</label>
          <InputText id="numero" value={selectedCustomer ? selectedCustomer.numero : ''} onChange={(e) => setSelectedCustomer({ ...selectedCustomer, numero: e.target.value })} required />
        </div>
        <div className="p-field">
          <label htmlFor="cidade">Cidade</label>
          <InputText id="cidade" value={selectedCustomer ? selectedCustomer.cidade : ''} onChange={(e) => setSelectedCustomer({ ...selectedCustomer, cidade: e.target.value })} required />
        </div>
        <div className="p-field">
          <label htmlFor="bairro">Bairro</label>
          <InputText id="bairro" value={selectedCustomer ? selectedCustomer.bairro : ''} onChange={(e) => setSelectedCustomer({ ...selectedCustomer, bairro: e.target.value })} required />
        </div>
        <div className="p-field">
          <label htmlFor="estado">Estado</label>
          <InputText id="estado" value={selectedCustomer ? selectedCustomer.estado : ''} onChange={(e) => setSelectedCustomer({ ...selectedCustomer, estado: e.target.value })} required />
        </div>
        <div className="p-field">
          <label htmlFor="tipoVarejo">Tipo Varejo</label>
          <Checkbox inputId="tipoVarejo" checked={selectedCustomer ? selectedCustomer.tipoVarejo : false} onChange={(e) => setSelectedCustomer({ ...selectedCustomer, tipoVarejo: e.checked })} />
        </div>
        <div className="p-field">
          <label htmlFor="tipoBoutique">Tipo Boutique</label>
          <Checkbox inputId="tipoBoutique" checked={selectedCustomer ? selectedCustomer.tipoBoutique : false} onChange={(e) => setSelectedCustomer({ ...selectedCustomer, tipoBoutique: e.checked })} />
        </div>
      </Dialog>
    </PageContainer>
  );
}

export default Page4;
