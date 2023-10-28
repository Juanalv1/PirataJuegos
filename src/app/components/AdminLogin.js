"use client"
import React from 'react'
import { UserProvider, useUser } from './../userContext'
import Link from 'next/link';


const AdminLogin = () => {
  const { isAdmin } = useUser();
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
