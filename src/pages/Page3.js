import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import styled from 'styled-components';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
  gap: 10px;
`;

const InputField = ({ id, label, value, onChange }) => (
  <div className="p-field">
    <label htmlFor={id}>{label}</label>
    <InputText id={id} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const MyButton = ({ label, onClick, className }) => (
  <Button label={label} onClick={onClick} className={className} />
);

function Page3() {
  const [fkEquipeDeVendasCpf, setFkEquipeDeVendasCpf] = useState('');
  const [fkClientesCnpj, setFkClientesCnpj] = useState('');

  const [fkVendaNumeroVenda, setFkVendaNumeroVenda] = useState('');
  const [fkProdutosCodigoDeBarras, setFkProdutosCodigoDeBarras] = useState('');
  const [fkAtendeNumeroAtendimento, setFkAtendeNumeroAtendimento] = useState('');
  const [quantidadeDeProduto, setQuantidadeDeProduto] = useState('');
  const [dataVenda, setDataVenda] = useState('');

  const [numeroVenda, setNumeroVenda] = useState('');
  const [codigoProduto, setCodigoProduto] = useState('');
  const [novaQuantidadeDeProduto, setNovaQuantidadeDeProduto] = useState('');

  const handleCreateAtendimento = async () => {
    const atendimentoData = {
      fkEquipeDeVendasCpf,
      fkClientesCnpj,
    };

    try {
      const response = await fetch('http://localhost:8080/atende', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atendimentoData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Atendimento criado com sucesso:', data);

      // Limpar os campos após a criação
      setFkEquipeDeVendasCpf('');
      setFkClientesCnpj('');
    } catch (error) {
      console.error('Erro ao criar atendimento:', error);
    }
  };

  const handleCreateFazVendaProduto = async () => {
    const fazVendaProdutoData = {
      fkVendaNumeroVenda,
      fkProdutosCodigoDeBarras,
      fkAtendeNumeroAtendimento,
      quantidadeDeProduto,
    };

    try {
      const response = await fetch('http://localhost:8080/fazVendaProduto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fazVendaProdutoData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Produto adicionado à venda com sucesso:', data);

      // Limpar os campos após a criação
      setFkVendaNumeroVenda('');
      setFkProdutosCodigoDeBarras('');
      setFkAtendeNumeroAtendimento('');
      setQuantidadeDeProduto('');
    } catch (error) {
      console.error('Erro ao adicionar produto à venda:', error);
    }
  };

  const handleCreateVenda = async () => {
    const vendaData = {
      data: dataVenda,
    };

    try {
      const response = await fetch('http://localhost:8080/vendas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendaData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Venda criada com sucesso:', data);

      // Limpar os campos após a criação
      setDataVenda('');
    } catch (error) {
      console.error('Erro ao criar venda:', error);
    }
  };

  const handleUpdateQuantidade = async () => {
    const updateData = {
      quantidadeDeProduto: novaQuantidadeDeProduto,
    };

    try {
      const response = await fetch(`http://localhost:8080/fazVendaProduto/${numeroVenda}/${codigoProduto}/quantidade`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Quantidade da venda atualizada com sucesso:', data);

      // Limpar os campos após a atualização
      setNumeroVenda('');
      setCodigoProduto('');
      setNovaQuantidadeDeProduto('');
    } catch (error) {
      console.error('Erro ao atualizar quantidade da venda:', error);
    }
  };

  return (
    <div>
      <h1>Vendas</h1>
      <h2>Editar ou Criar Atendimento</h2>

      <div className="formgrid grid">
        <div className="field col-12 md:col-3">
          <InputField id="fkEquipeDeVendasCpf" label="CPF da Equipe de Vendas" value={fkEquipeDeVendasCpf} onChange={setFkEquipeDeVendasCpf} />
        </div>
        <div className="field col-12 md:col-3">
          
          <InputField id="fkClientesCnpj" label="CNPJ do Cliente" value={fkClientesCnpj} onChange={setFkClientesCnpj} />
        </div>
        <div className="field col-12 md:col-3">
          <MyButton label="Criar Novo Atendimento" onClick={handleCreateAtendimento} className="custom-button" />
        </div>
      </div>

      <h2>Inserir data da Venda</h2>
      <div className="formgrid grid">
        <div className="field col-12 md:col-6">
          <InputField id="dataVenda" label="Data da Venda" value={dataVenda} onChange={setDataVenda} />
        </div>
        <div className="field col-12 md:col-3">
          <MyButton label="Inserir Data" onClick={handleCreateVenda} className="custom-button" />
        </div>
      </div>
        

      <h2>Criar Venda</h2>

      <div className="formgrid grid">
        <div className="field col-12 md:col-3">
          <InputField id="fkVendaNumeroVenda" label="Número da Venda" value={fkVendaNumeroVenda} onChange={setFkVendaNumeroVenda} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="fkProdutosCodigoDeBarras" label="Código de Barras do Produto" value={fkProdutosCodigoDeBarras} onChange={setFkProdutosCodigoDeBarras} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="fkAtendeNumeroAtendimento" label="Número do Atendimento" value={fkAtendeNumeroAtendimento} onChange={setFkAtendeNumeroAtendimento} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="quantidadeDeProduto" label="Quantidade de Produto" value={quantidadeDeProduto} onChange={setQuantidadeDeProduto} />
        </div>
      </div>

      <div className="button-container">
        <MyButton label="Criar Nova Venda" onClick={handleCreateFazVendaProduto} className="custom-button" />
      </div>

      <h2>Editar quantidade da venda</h2>
      <div className="formgrid grid">
        <div className="field col-12 md:col-3">
          <InputField id="numeroVenda" label="Número da Venda" value={numeroVenda} onChange={setNumeroVenda} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="codigoProduto" label="Código de Barras do Produto" value={codigoProduto} onChange={setCodigoProduto} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="novaQuantidadeDeProduto" label="Nova Quantidade de Produto" value={novaQuantidadeDeProduto} onChange={setNovaQuantidadeDeProduto} />
        </div>
      </div>

      <div className="button-container">
        <MyButton label="Atualizar Quantidade" onClick={handleUpdateQuantidade} className="custom-button" />
      </div>
    </div>
  );
}

export default Page3;
