// src/componentes/Input/InputField.js
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css'; // Certifique-se de importar o PrimeFlex
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema do PrimeReact
import 'primereact/resources/primereact.min.css'; // Estilos do PrimeReact
import 'primeicons/primeicons.css'; // Ícones do PrimeIcons
import '../../styles/customStyles.css'; // Importe o CSS personalizado
import styled from 'styled-components';

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px; /* Definir largura máxima */
  margin: 0 auto; /* Centralizar horizontalmente */
`;

const InputTextStyled = styled(InputText)`
  flex: 1;
  border-top-right-radius: ${({ $showButton }) => ($showButton ? '0' : '4px')};
  border-bottom-right-radius: ${({ $showButton }) => ($showButton ? '0' : '4px')};
`;

const ButtonStyled = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const InputField = ({ id, label, value, onChange, showButton = true }) => {
  return (
    <div className="p-field">
      <InputGroup>
        <InputTextStyled 
          id={id} 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder={label} 
          className="custom-input" 
          $showButton={showButton} // Note o uso de $ para evitar passar para o DOM
        />
        {showButton && (
          <ButtonStyled 
            icon="pi pi-search" 
            className="p-button" 
          />
        )}
      </InputGroup>
    </div>
  );
};

export default InputField;
