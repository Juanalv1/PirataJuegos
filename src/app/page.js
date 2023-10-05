"use client"
import Image from 'next/image'
import Head from 'next/head';
import Link from 'next/link';
import RootLayout from './layout';
import Card from './components/card';
import ListaJuegos from './components/listaJuegos';
import Navbar from './components/Navbar'
import Layout from './components/Layout';
import { UserProvider, useUser } from './userContext';




export default function Home() {
  const { isAdmin } = useUser();
  console.log(isAdmin)
  

  return (
  <UserProvider>
      <Layout>
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
          
          <h2 className="text-2xl font-semibold mb-4 underline underline-offset-8 decoration-slate-900 decoration-1">Publicaciones Destacadas</h2>
          <ul className='flex w-full'>
            <ListaJuegos /> 
          </ul>
        </section>
      </Layout>
    </UserProvider>
  )
}
