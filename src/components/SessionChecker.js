"use client"
import React from 'react'
import { useAppContext } from '@/app/Context/AppContext'

const SessionChecker = ({juego}) => {
  const { session } = useAppContext()
  return (
    <div>
      {session && (<p>Post Id: {juego.post_id}</p>)}
    </div>
  )
}

export default SessionChecker
