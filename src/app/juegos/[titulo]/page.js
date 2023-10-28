
import Layout from '@/app/components/Layout';
import GamePage from '../../components/GamePage'


export async function titulo ({ params }) {
  const { titulo } = params // "id" debe coincidir con el nombre del parámetro en la URL
  const fetchData = async () => {
    const res = await fetch(`http://piratajuegos.com/api/posts/${titulo}`)
    return res.json()
   }
  let juego = await fetchData()
const fechaBD = new Date(juego[0].date);

const dia = fechaBD.getDate(); // 
const mes = fechaBD.getMonth() + 1; // 
const año = fechaBD.getFullYear(); // 
const fechaFormateada = `${dia}/${mes}/${año}`;
const formattedCategories = juego[0].categories.join(' ');
const formattedLanguages = juego[0].languages.join(' ');
const metadata = {
  title: juego[0].post_title,
  description: `Descarga ${juego[0].post_title} Gratis`,
}
const content = (
  <Layout>
    {juego && (<GamePage titulo={juego[0].post_title} categoria={formattedCategories} contenido={juego[0].post_text} imagen={juego[0].img_url} peso={juego[0].size} idiomas={formattedLanguages} fechaLanzamiento={fechaFormateada} dlink={juego[0].download_link} desarrollador={juego[0].developer} requirements={juego[0].requirements} video_id={juego[0].video_id}/>)}
    
  </Layout>
)
  return{
    props: {
      content,
      metadata
    }
  }
}
