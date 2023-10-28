"use client"
import React from 'react'
import { useUser } from '../userContext'
import Link from 'next/link'
const BtnLogin = () => {
  const {isDev} = useUser()
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
