import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/page1">Go to Page 1</Link>
      <br />
      <Link to="/page2">Go to Page 2</Link>
    </div>
  );
}

export default Home;
