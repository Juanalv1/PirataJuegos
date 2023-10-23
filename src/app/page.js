"use client"

import Link from 'next/link';
import ListaJuegos from './components/ListaJuegos.js';
import Layout from './components/Layout';
import { UserProvider, useUser } from './userContext';
import Head from 'next/head.js';
import { useEffect } from 'react';
import BtnLogin from './components/BtnLogin.js';




export default function Home() {
  const { isAdmin } = useUser();
  return (

      <Layout>
         <Head>
          <title>Home - PirataJuegos</title>
          <meta name="description" content="Descarga Juegos piratas gratis" />
        </Head>
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
          <div className='flex font-Quato'>
          <section className='px-6 py-2 flex flex-col w-3/4'>
            <BtnLogin />
            <h2 className="text-2xl font-semibold decoration-slate-900 decoration-1 ">Añadido recientemente</h2>
            <ul className='flex w-full'>
              <ListaJuegos /> 
            </ul>
          </section>
          <aside className='w-1/4 border-l border-black px-6 py-2'>
            <h4 className='text-lg font-bold m-1 text-center'>Publicidad</h4>
          </aside>
        </div>
      </Layout>

  )
}
