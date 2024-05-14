"use client"
import { createContext, useContext, useEffect, useState } from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts`)
        const resJSON = await res.json()
        setPosts(resJSON.slice(0, 20))
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (posts.length == 0) {
      fetchData()
    }
  }, [posts])


  return (
    <AppContext.Provider value={{session, setSession, posts }}>
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
