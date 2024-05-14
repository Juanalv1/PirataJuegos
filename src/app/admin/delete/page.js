"use client"

import Home from "@/components/BtnHome"
import Layout from "@/components/Layout"
import { useAppContext } from "@/app/Context/AppContext"
import { useState, useEffect } from "react"
import { redirect } from 'next/navigation'
import SuccessMesssage from "@/components/SuccessMessage"
import ErrorMesssage from "@/components/ErrorMessage"

export default function DeletePost () {
const [title, setTitle] = useState()
const [id, setId] = useState()
const [isSuccess, setIsSuccess] = useState(false)
const [isError, setIsError] = useState(false)

const { session } = useAppContext()
useEffect(() => {
  if(!session){
    redirect('/login')
  }
}, [session])

const handleFetchPost = async () => {
  setTitle(null)
  try {
    const response =  await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts/id/${id}`)
    const data = await response.json()
    console.log(response)
    if (!response.ok) {
      setIsError(data)
      setTimeout(() => {
        setIsError(null)
      }, 3000);
    } else {
      setTitle(data.post_title)
    }
  } catch (error) {
    setIsError(error.message)
    setTimeout(() => {
      setIsError(null)
    }, 3000);
  }
}

const handleDeletePost = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts/id/${id}`,{ 
    method: 'DELETE',})
    const data = await response.json()
    if (!response.ok) {
      setIsError(data)
      setTimeout(() => {
        setIsError(null)
      }, 3000);
    } else {
      setTitle(null)
      setIsSuccess("Post deleted succesfully")
      setTimeout(() => {
        setIsSuccess(null)
      }, 3000);
    }
};
return(
    <Layout>
      <div className="flex flex-col p-4 gap-y-2">
        {isSuccess && (<SuccessMesssage text={isSuccess}/>)}
        {isError && (<ErrorMesssage text={isError}/>)}
        <h1>Borrar Publicacion</h1>
        <input type="text" onChange={(e) => setId(e.target.value)} value={id}></input>
        <button onClick={() => {
          handleFetchPost()
        }} className="bg-green-500 text-white p-2 rounded">Fetch post</button>
        {title && (
        <>
          <p>{title}</p>
          <button onClick={() => {
          handleDeletePost()
        }} className="bg-red-500 text-white p-2 rounded">Borrar
        </button>
        </>
      )}

      </div>
   </Layout>
)
}