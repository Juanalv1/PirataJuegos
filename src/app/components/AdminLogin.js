"use client"
import React, { useState } from 'react'
import { UserProvider, useUser } from './../userContext'
import Link from 'next/link';


const AdminLogin = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState('')
  const [tokenToSend, setTokenToSend] = useState('')
  if (typeof window !== 'undefined'){
    setToken(JSON.parse(localStorage.getItem('token')));
  }
  
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
