import React from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/customStyles.css'; 

const MyButton = ({ label, onClick, className }) => {
  return (
    <Button label={label} onClick={onClick} className={`p-button ${className}`} />
  );
};

export default MyButton;