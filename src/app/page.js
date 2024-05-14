
import ListaJuegos from '../components/ListaJuegosHome.js';
import './globals.css'
import Layout from '../components/Layout.js';
import BtnLogin from '../components/BtnLogin.js';

export const dynamic = 'force-dynamic'

export default async function Home() {

  const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts`, {next: {
      revalidate: 60
    }})
    const resJSON = await res.json()
    return resJSON
    }

  const posts = await getData()
  return (
      <Layout>
          <div className='flex flex-col md:flex-row font-Quato '>

          <section className='px-4 lg:px-6 py-2 flex flex-col w-full lg:w-3/4 '>
            <BtnLogin />
            <div>
            <h1 className="md:text-2xl text-lg font-bold  text-center">Descarga Juegos Gratis</h1>
            <h2 className='text-lg sm:text-xl font-bold mt-2'>Añadidos Recientemente</h2>
            </div>
            <ul className='flex w-full m-1'>
              {posts && (<ListaJuegos posts={posts}/> )}

            </ul>
          </section>
          {/* <aside className='border-l border-black py-2 hidden md:flex flex-col w-1/4 px-8'>
            <h3 className='text-lg font-bold m-1 text-center'>Publicidad</h3>
          <div id="container-9c30a0f07e3e73bde234faed95ab8d55"></div>
          </aside> */}
        </div>
      </Layout>

  )
}
export const metadata = {
  title: 'Piratajuegos | Descarga Juegos Gratis',
  description: 'Descarga Tus Juegos Favoritos De Forma Totalmente Gratuita, Con un Solo Link Por Mega Y Mediafire. Descarga y juega, totalmente libre de virus',
  alternates: {
    canonical: 'https://piratajuegos.com',
  },
  openGraph: {
    title: `Piratajuegos | Descarga Juegos Gratis`,
    description: `Descarga Tus Juegos Favoritos De Forma Totalmente Gratuita, Con un Solo Link Por Mega Y Mediafire. Descarga y juega, totalmente libre de virus`,
    type: 'website',
    images: "https://i.postimg.cc/YCjFc6TD/log-yt.png"
    
  },
}
