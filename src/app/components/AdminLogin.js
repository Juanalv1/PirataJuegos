"use client"
import React, { useEffect, useState } from 'react'
import { UserProvider, useUser } from './../userContext'
import Link from 'next/link';


const AdminLogin = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState('')
  const [tokenToSend, setTokenToSend] = useState('')
  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window !== 'undefined') {
        setToken(JSON.parse(localStorage.getItem('token')));
  
        if (token) {
          
          try {
            setTokenToSend(token.jwt)
            const response = await fetch('https://piratajuegos.com/api/user', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${tokenToSend}`,
                'Content-Type': 'application/json'
              }
            });
  
            if (response.status === 200) {
              // El código 200 indica que es administrador
              setIsAdmin(true);
            }
          } catch (error) {
            console.error('Error al verificar el estado de administrador:', error);
          }
        }
      }
    };
  
    fetchUser();
  }, [setIsAdmin]);

  

  return (
    <div>
      {isAdmin && (<><button>
          <Link href={`/admin/create`}>
              Crear 
          </Link>       
          </button>
          <button>
            <Link href={`/admin/delete`}>
              Borrar
            </Link>
          </button></>) }
    </div>
  )
}

export default AdminLogin
