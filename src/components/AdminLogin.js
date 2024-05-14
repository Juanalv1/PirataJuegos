"use client"
import React, { useContext, useEffect, useState } from 'react'
import { useAppContext } from '../app/Context/AppContext.js'
import Link from 'next/link';


const AdminLogin = () => {
  const {isAdmin} = useAppContext()
  

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
