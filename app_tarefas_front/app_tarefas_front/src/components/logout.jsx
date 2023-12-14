// Importa o React, o hook useAuth e o provedor de autenticação (AuthProvider)
import React from 'react';
import { useAuth } from './AuthProvider';

// Componente LogoutButton
const LogoutButton = () => {
    // Usa o hook useAuth para acessar as funções relacionadas à autenticação
    const { logout } = useAuth();

    // Função chamada ao clicar no botão de logout
    const handleLogout = () => {
        // Chama a função de logout do contexto de autenticação
        logout();
    };

    // Renderiza um botão que, ao ser clicado, chama a função handleLogout
    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

// Exporta o componente LogoutButton
export default LogoutButton;
