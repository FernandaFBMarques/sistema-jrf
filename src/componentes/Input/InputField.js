import React from 'react';
import { InputText } from 'primereact/inputtext';
import 'primeflex/primeflex.css'; // Certifique-se de importar o PrimeFlex
import '../../styles/customStyles.css'; // Importe o CSS personalizado

const InputField = ({ id, label, value, onChange}) => {
  return (
    <div>
      <div className="p-field">
        <span className="p-float-label">
          <InputText id={id} value={value} onChange={(e) => onChange(e.target.value)} className="custom-input" />
          <label htmlFor={id}>{label}</label>
        </span>
      </div>
    </div>
  );
};

export default InputField;