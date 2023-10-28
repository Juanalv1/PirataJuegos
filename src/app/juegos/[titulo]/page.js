
import Layout from '@/app/components/Layout';
import GamePage from '../../components/GamePage'

const fetchData = async ({ params }) => {
  const { titulo } = params // "id" debe coincidir con el nombre del parámetro en la URL
  console.log(titulo)
  const req = await fetch(`http://piratajuegos.com/api/posts/${titulo}`)
  const res = req[0].json()
  return res
}
export const metadata = {
  title: await fetchData().post_title,
  description: `Descarga ${await fetchData().post_title} Gratis`,
}

export default async function titulo ({ params }) {
  const { titulo } = params // "id" debe coincidir con el nombre del parámetro en la URL
  let juego = await fetchData()
const fechaBD = new Date(juego[0].date);

const dia = fechaBD.getDate(); // 
const mes = fechaBD.getMonth() + 1; // 
const año = fechaBD.getFullYear(); // 
const fechaFormateada = `${dia}/${mes}/${año}`;
const formattedCategories = juego[0].categories.join(' ');
const formattedLanguages = juego[0].languages.join(' ');

  return(<Layout>
    {juego && (<GamePage titulo={juego[0].post_title} categoria={formattedCategories} contenido={juego[0].post_text} imagen={juego[0].img_url} peso={juego[0].size} idiomas={formattedLanguages} fechaLanzamiento={fechaFormateada} dlink={juego[0].download_link} desarrollador={juego[0].developer} requirements={juego[0].requirements} video_id={juego[0].video_id}/>)}
    
  </Layout>)
}
