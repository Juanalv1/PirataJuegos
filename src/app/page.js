
import ListaJuegos from './components/ListaJuegos.js';
import Layout from './components/Layout';
import BtnLogin from './components/BtnLogin.js';
import AdminLogin from './components/AdminLogin.js';





export default function Home() {
  return (

      <Layout>
         <AdminLogin />
          <div className='flex font-Quato'>
          <section className='px-6 py-2 flex flex-col w-3/4'>
            <BtnLogin />
            <h2 className="text-3xl font-bold  text-center ">Añadido recientemente</h2>
            <ul className='flex w-full m-1'>
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
export const metadata = {
  title: 'Home - Piratajuegos',
  description: 'Descarga Juegos Gratis',
}
