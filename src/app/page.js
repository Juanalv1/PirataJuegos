"use client"

import Link from 'next/link';
import ListaJuegos from './components/ListaJuegos.js';
import Layout from './components/Layout';
import { UserProvider, useUser } from './userContext';
import Head from 'next/head.js';



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
        <section className='px-6 py-2 flex flex-col'>
          
          <button>
            <Link href={`/login`}>
              login
            </Link>
          </button>
          
          <h2 className="text-2xl font-semibold mb-4 underline underline-offset-8 decoration-slate-900 decoration-1">Añadido recientemente</h2>
          <ul className='flex w-full'>
            <ListaJuegos /> 
          </ul>
        </section>
      </Layout>

  )
}
