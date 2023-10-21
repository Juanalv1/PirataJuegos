"use client"
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Inicialmente, el usuario no es administrador
  const [token, setToken] = useState(null);
  const [searchValue, setSearchValue] = useState('')
  const [isDev, setIsDev] = useState(false)
  useEffect(()=>{
    console.log(isDev)
  }, [isDev])
  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin, token, setToken, searchValue, setSearchValue, isDev, setIsDev }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
