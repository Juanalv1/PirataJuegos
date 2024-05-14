
import Layout from '@/components/Layout';
import GamePage from '../../../components/GamePage'

export async function generateMetadata({ params }) {
  // read route params
  const { titulo } = params

  // fetch data
  const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts/${titulo.replace(/ /g, "-")}`)
  const juego = await res.json()

  return {
      title: `Descarga ${decodeURIComponent(titulo).replace(/-/g, " ")} Gratis | Piratajuegos`,
      description: `Descarga ${decodeURIComponent(titulo).replace(/-/g, " ")} Gratis | Piratajuegos | De Forma Totalmente Gratuita, por Mega y Mediafire. Solo en Piratajuegos. Descarga y juega. Libre de virus`,
      alternates: {
        canonical: `https://piratajuegos.com/juegos/${titulo}`,
    },
    openGraph: {
      title: `Descarga ${decodeURIComponent(titulo).replace(/-/g, " ")} Gratis | Piratajuegos`,
      description: `Descarga ${decodeURIComponent(titulo).replace(/-/g, " ")} Gratis | Piratajuegos | De Forma Totalmente Gratuita, por Mega y Mediafire. Solo en Piratajuegos. Descarga y juega. Libre de virus`,
      type: 'website',
      images: juego.img_url
      
    },
  }
  
}
export default async function Titulo ({ params }) {

  const { titulo } = params
  const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts/${titulo.replace(/ /g, "-")}`)
  const juego = await res.json()
  console.log(juego)
  return(
    <Layout>
      {juego && (<GamePage juego={juego}/>)}
    </Layout>)
}
