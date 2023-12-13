// Importando as bibliotecas React e ReactDOM/client
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importando o componente principal App e os estilos
import App from './App.jsx';
import './index.css';

// Renderizando o componente App dentro de um StrictMode usando ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
