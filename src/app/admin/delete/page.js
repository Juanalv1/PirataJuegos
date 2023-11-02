"use client"

import Home from "@/app/components/BtnHome"
import Layout from "@/app/components/Layout"
import { useAppContext } from "@/app/Context/AppContext"
import { useState, useEffect } from "react"
import { redirect } from 'next/navigation'



export default function DeletePost () {
const [title, setTitle] = useState('')
const { isAdmin, tokenToSend } = useAppContext()
useEffect(() => {
  if(!isAdmin){
    redirect('/login')
  }
}, [isAdmin])

const HandleClick = () => {
  fetch(`https://piratajuegos.com/api/posts${tokenToSend}`,{ 
    method: 'DELETE',
    'Authorization': `Bearer ${tokenToSend}`,
  })
    .then((response) => {
      if (response.ok) {
        console.log('ok')
      } else {
        console.log('error')
      }
    })
    .catch((error) => {
      console.log(error)
    });
};



return(

    <Layout>
      <div>
        <h1>Borrar Publicacion</h1>
        <input type="text" onChange={(e) => setTitle(e.target.value)}></input>
        <button onClick={() => {
          HandleClick()
        }}>Borrar</button>
        <Home />
      </div>
   </Layout>
)
}