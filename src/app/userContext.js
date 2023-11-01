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
      if (token) {
        setTokenToSend(token.jwt)
        fetch('https://piratajuegos.com/api/user', {
        method: 'GET', // o el método que corresponda
        headers: {
          'Authorization': `Bearer ${tokenToSend}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200) {
          // El código 200 indica que es administrador
          setIsAdmin(true);
          
        } 
      })
          .catch(error => {
            console.error('Error al verificar el estado de administrador:', error);
          });
      }
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
