import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
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

const ProductListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid #dcdcdc;
`;

const ProductListDetail = styled.div`
  flex: 1;
  padding: 1em;
`;

const ProductListAction = styled.div`
  display: flex;
  align-items: center;
`;

const ProductGridItem = styled.div`
  padding: 1em;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin: 0.5em;
`;

const ProductGridDetail = styled.div`
  text-align: center;
  padding: 1em 0;
`;

const ProductGridAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Page2() {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState('grid');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/endpoint2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: 'value' }),
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Expected an array but got:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const renderListItem = (product) => {
    return (
      <ProductListItem className="p-col-12">
        <img src={product.image} alt={product.name} />
        <ProductListDetail>
          <h5>{product.name}</h5>
          <p>{product.description}</p>
        </ProductListDetail>
        <ProductListAction>
          <span className="product-price">${product.price}</span>
          <Button icon="pi pi-shopping-cart" label="Add to Cart" />
        </ProductListAction>
      </ProductListItem>
    );
  };

  const renderGridItem = (product) => {
    return (
      <ProductGridItem className="p-col-12 p-md-4">
        <img src={product.image} alt={product.name} />
        <ProductGridDetail>
          <h5>{product.name}</h5>
          <p>{product.description}</p>
        </ProductGridDetail>
        <ProductGridAction>
          <span className="product-price">${product.price}</span>
          <Button icon="pi pi-shopping-cart" label="Add to Cart" />
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
      <h1>Produtos</h1>
      <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
      <DataView value={products} layout={layout} itemTemplate={itemTemplate} />
    </PageContainer>
  );
}

export default Page2;
