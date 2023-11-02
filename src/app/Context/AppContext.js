"use client"
import { createContext, useContext, useEffect, useState } from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoged, setIsLoged] = useState(false);
  const [tokenToSend, setTokenToSend] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [isDev, setIsDev] = useState(false)
  useEffect(() => {
  let localToken = {}
  let token = ''
    if (typeof window !== 'undefined') {
      localToken = JSON.parse(localStorage.getItem('token'));
    }
    if(localToken) {
      token = localToken.jwt
      setTokenToSend(token)
      fetchUser(token)
    }
  }, [isLoged]); 
  const fetchUser = async (token) => {
    try {
      const response = await fetch('https://piratajuegos.com/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error al verificar el estado de administrador:', error);
    }
  };
 

  return (
    <AppContext.Provider value={{ isAdmin, setIsAdmin, searchValue, setSearchValue, isDev, setIsDev, tokenToSend, isLoged, setIsLoged }}>
      {children}
    </AppContext.Provider>
  );}
;
export function useAppContext() {
  const context = useContext(AppContext);

  if(!context){
    console.error('Error deploying App Context!!!');
  }

  return context;
}
