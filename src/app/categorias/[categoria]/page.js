"use client"
import Home from "@/app/components/BtnHome"
import Layout from "@/app/components/Layout"
import ListaJuegos from "@/app/components/ListaJuegos"
import RootLayout from "@/app/layout"
Home
RootLayout

export default function GamesList ({params}) {
  const categoria = params
  
  return(

    <Layout>
      <h1 className="text-2xl font-bold font-Cinzel p-2">{categoria.categoria}</h1>
      <ListaJuegos categoria={categoria}>
      </ListaJuegos>
    </Layout>

  )
}