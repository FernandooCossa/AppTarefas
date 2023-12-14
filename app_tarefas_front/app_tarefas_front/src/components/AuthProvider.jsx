import { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [autenticado, setAutenticado] = useState(() => {
        // Inicializa o estado com base no localStorage
        return localStorage.getItem('autenticado') === 'true';
    });

    const login = () => {
        setAutenticado(true);
    };

    const logout = () => {
        setAutenticado(false);
    };

    // Efeito para persistir o estado no localStorage
    useEffect(() => {
        localStorage.setItem('autenticado', autenticado.toString());
    }, [autenticado]);

    return (
        <AuthContext.Provider value={{ autenticado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
