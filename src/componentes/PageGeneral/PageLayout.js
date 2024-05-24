import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../../styles/PageLayout.css'; 

const PageLayout = ({ children }) => {
  return (
    <div className="p-d-flex p-jc-center p-ai-center p-mt-6">
      <div className="centered-content">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;