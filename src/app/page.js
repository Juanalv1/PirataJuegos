
import ListaJuegos from './components/ListaJuegos.js';
import './globals.css'
import Layout from './components/Layout';
import BtnLogin from './components/BtnLogin.js';
import AdminLogin from './components/AdminLogin.js';





export default function Home() {
  
  return (

      <Layout>
         <AdminLogin />
          <div className='flex flex-col md:flex-row font-Quato '>
          <section className='px-4 lg:px-6 py-2 flex flex-col w-full lg:w-3/4 '>
            <BtnLogin />
            <div>
            <h1 className="md:text-2xl text-lg font-bold  text-center">Descarga Juegos Gratis</h1>
            <h2 className='text-lg sm:text-xl font-bold mt-2'>Añadidos Recientemente</h2>
            </div>
            <ul className='flex w-full m-1'>
              <ListaJuegos /> 
            </ul>
          </section>
          <aside className='border-l border-black py-2 hidden md:flex flex-col w-1/4 px-8'>
            <h3 className='text-lg font-bold m-1 text-center'>Publicidad</h3>
          <div id="container-9c30a0f07e3e73bde234faed95ab8d55"></div>
          </aside>
        </div>
      </Layout>

  )
}
export const metadata = {
  title: 'Piratajuegos | Descarga Juegos Gratis',
  description: 'Descarga Tus Juegos Favoritos De Forma Totalmente Gratuita, Con un Solo Link Por Mega Y Mediafire',
  alternates: {
    canonical: 'https://piratajuegos.com',
  },
}
