import React from 'react';

function Page2() {
  const handleButtonClick = async () => {
    const response = await fetch('http://localhost:8080/api/endpoint2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'value' }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Page 2</h1>
      <button onClick={handleButtonClick}>Perform Action 2</button>
    </div>
  );
}

export default Page2;
