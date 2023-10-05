"use client"
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Inicialmente, el usuario no es administrador
  const [token, setToken] = useState(null);
  const [searchValue, setSearchValue] = useState('')
  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin, token, setToken, searchValue, setSearchValue }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
