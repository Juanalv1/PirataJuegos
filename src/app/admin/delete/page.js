"use client"

import Home from "@/app/components/BtnHome"
import Layout from "@/app/components/Layout"
import { UserProvider, useUser } from "@/app/userContext"
import { useState } from "react"



export default function DeletePost () {
const [title, setTitle] = useState('')
const { token } = useUser()
console.log(token)

const HandleClick = () => {
  fetch(`https://pirataback.vercel.app/api/posts${title}`,{ 
    method: 'DELETE',
    'Authorization': `Bearer ${token}`,
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
  <UserProvider>
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
  </UserProvider>)
}