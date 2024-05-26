import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import InputField from '../componentes/Input/InputField.js';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 5px;
  gap: 5px;
  background-color: white;
`;

const PageTitle = styled.h1`
  color: #002f52;
`;

const ProductListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid #dcdcdc;
  background-color: white;
  padding: 20px;
`;

const ProductListDetail = styled.div`
  flex: 1;
  padding: 1em;
  word-wrap: break-word;
`;

const ProductListAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const ProductGridItem = styled.div`
  padding: 1em;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin: 0.5em;
  background-color: white;
  padding: 20px;
`;

const ProductGridDetail = styled.div`
  text-align: center;
  padding: 1em 0;
  word-wrap: break-word;
`;

const ProductGridAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0 auto;
`;

const CustomButton = styled(Button)`
  background-color: #326589;
  color: white;
  border: none;
  margin-top: 0.5em;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const FormGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5em;
`;

function Page2() {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState('grid');
  const [editingProduct, setEditingProduct] = useState(null);
  const [codigoDeBarras, setCodigoDeBarras] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [prazo, setPrazo] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleCreateProduct = async () => {
    try {
      const response = await axios.post('http://localhost:8080/produtos/addProduto', {
        codigoDeBarras, nomeProduto, modelo, cor, tamanho, categoria, preco, prazo, urlImagem
      });
      console.log('Produto criado com sucesso:', response.data);
      handleGetProducts();
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao criar o produto');
    }
  };

  const handleGetProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/produtos');
      setProducts(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao buscar os produtos');
    }
  };

  const handleDeleteProduct = async (codigoDeBarras) => {
    try {
      await axios.delete(`http://localhost:8080/produtos/${codigoDeBarras}`);
      handleGetProducts();
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao deletar o produto');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setCodigoDeBarras(product.codigoDeBarras);
    setNomeProduto(product.nomeProduto);
    setModelo(product.modelo);
    setCor(product.cor);
    setTamanho(product.tamanho);
    setCategoria(product.categoria);
    setPreco(product.preco);
    setPrazo(product.prazo);
    setUrlImagem(product.urlImagem);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/produtos/updateProduto/${codigoDeBarras}`, {
        nomeProduto, modelo, cor, tamanho, categoria, preco, prazo, urlImagem
      });
      console.log('Produto atualizado com sucesso:', response.data);
      handleGetProducts();
      setEditingProduct(null);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao atualizar o produto');
    }
  };

  const renderListItem = (product) => {
    return (
      <ProductListItem className="p-col-12">
        <ProductImage src={product.urlImagem} alt={product.nomeProduto} />
        <ProductListDetail>
          <h5>{product.nomeProduto}</h5>
          <p>Modelo: {product.modelo}</p>
          <p>Cor: {product.cor}</p>
          <p>Tamanho: {product.tamanho}</p>
          <p>Categoria: {product.categoria}</p>
          <p>Prazo: {new Date(product.prazo).toLocaleDateString()}</p>
        </ProductListDetail>
        <ProductListAction>
          <span className="product-price">${product.preco}</span>
          <ButtonContainer>
            <Button icon="pi pi-pencil" label="Edit" onClick={() => handleEditProduct(product)} />
            <Button icon="pi pi-trash" label="Delete" onClick={() => handleDeleteProduct(product.codigoDeBarras)} />
          </ButtonContainer>
        </ProductListAction>
      </ProductListItem>
    );
  };

  const renderGridItem = (product) => {
    return (
      <ProductGridItem className="p-col-12 p-md-4">
        <ProductImage src={product.urlImagem} alt={product.nomeProduto} />
        <ProductGridDetail>
          <h5>{product.nomeProduto}</h5>
          <p>Modelo: {product.modelo}</p>
          <p>Cor: {product.cor}</p>
          <p>Tamanho: {product.tamanho}</p>
          <p>Categoria: {product.categoria}</p>
          <p>Prazo: {new Date(product.prazo).toLocaleDateString()}</p>
        </ProductGridDetail>
        <ProductGridAction>
          <span className="product-price">${product.preco}</span>
          <ButtonContainer>
            <Button icon="pi pi-pencil" label="Edit" onClick={() => handleEditProduct(product)} />
            <Button icon="pi pi-trash" label="Delete" onClick={() => handleDeleteProduct(product.codigoDeBarras)} />
          </ButtonContainer>
        </ProductGridAction>
      </ProductGridItem>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === 'list') {
      return renderListItem(product);
    } else if (layout === 'grid') {
      return renderGridItem(product);
    }
  };

  return (
    <PageContainer>
      <PageTitle>Produtos</PageTitle>

      <FormGrid className="formgrid grid">
        <div className="field col-12 md:col-3">
          <InputField id="codigoDeBarras" label="Código de Barras" value={codigoDeBarras} onChange={setCodigoDeBarras} showButton={false} disabled />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="nomeProduto" label="Nome do Produto" value={nomeProduto} onChange={setNomeProduto} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="modelo" label="Modelo" value={modelo} onChange={setModelo} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="cor" label="Cor" value={cor} onChange={setCor} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="tamanho" label="Tamanho" value={tamanho} onChange={setTamanho} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="categoria" label="Categoria" value={categoria} onChange={setCategoria} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="preco" label="Preço" value={preco} onChange={setPreco} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="prazo" label="Prazo" value={prazo} onChange={setPrazo} showButton={false} />
        </div>
        <div className="field col-12 md:col-3">
          <InputField id="urlImagem" label="URL da Imagem" value={urlImagem} onChange={setUrlImagem} showButton={false} />
        </div>
      </FormGrid>

      <div className="button-container">
        {editingProduct ? (
          <CustomButton label="Atualizar Produto" onClick={handleUpdateProduct} />
        ) : (
          <CustomButton label="Criar Produto" onClick={handleCreateProduct} />
        )}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
      <DataView value={products} layout={layout} itemTemplate={itemTemplate} />
    </PageContainer>
  );
}

export default Page2;
