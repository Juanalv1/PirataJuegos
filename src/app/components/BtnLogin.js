"use client"
import React, { useContext } from 'react'
import { useAppContext } from '../Context/AppContext'
import Link from 'next/link'
const BtnLogin = () => {
  const {isDev} = useAppContext()
  return (
    <div>
      {isDev && (
          <Link href={'/login'}>
            <button>
              Login
            </button>
          </Link>   
      )}
    </div>
  )
}

export default BtnLogin
