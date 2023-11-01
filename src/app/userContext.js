"use client"
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [tokenToSend, setTokenToSend] = useState('')
  const [isAdmin, setIsAdmin] = useState(false); // Inicialmente, el usuario no es administrador
  const [searchValue, setSearchValue] = useState('')
  const [isDev, setIsDev] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Solo ejecutar en el lado del cliente (navegador)
      setToken(JSON.parse(localStorage.getItem('token')));
      
      // Verificar el estado de administrador
      
    }
  }, [])
 

  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin, searchValue, setSearchValue, isDev, setIsDev, tokenToSend }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
