"use client"
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Inicialmente, el usuario no es administrador
  const [token, setToken] = useState(null);
  const [searchValue, setSearchValue] = useState('')
  const [dev, setDev] = useState(false)
  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin, token, setToken, searchValue, setSearchValue, dev, setDev }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
