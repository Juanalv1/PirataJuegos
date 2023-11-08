"use client"
import Home from "@/app/components/BtnHome"
import Layout from "@/app/components/Layout"
import ListaJuegos from "@/app/components/ListaJuegos"
import RootLayout from "@/app/layout"
import Head from "next/head"
Home
RootLayout

export default function GamesList ({params}) {
  const categoria = decodeURIComponent(params.categoria);
  
  return(

    <Layout>
        <Head>
          <title>{categoria} - PirataJuegos</title>
          <meta name="description" content={`${categoria}`} />
        </Head>
      <h1 className="text-2xl font-bold font-Cinzel p-2">{categoria}</h1>
      <ListaJuegos category={categoria}>
      </ListaJuegos>
    </Layout>

  )
}