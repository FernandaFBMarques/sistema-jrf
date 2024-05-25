import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/page1">Funcionários</Link>
      <br />
      <Link to="/page2">Produtos</Link>
    </div>
  );
}

export default Home;
