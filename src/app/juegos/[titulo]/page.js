
import Layout from '@/app/components/Layout';
import GamePage from '../../components/GamePage'
import Home from '@/app/components/BtnHome';

export default async function titulo ({ params }) {

  const { titulo } = params // "id" debe coincidir con el nombre del parámetro en la URL

  const fetchData = async () => {
   const res = await fetch(`http://192.168.1.27:3001/api/posts/${titulo}`)
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

  console.log(formattedCategories)
  return(
    <Layout>
    <GamePage titulo={juego[0].post_title} categoria={formattedCategories} contenido={juego[0].post_text} imagen={juego[0].img_url} peso={juego[0].size} idiomas={formattedLanguages} fechaLanzamiento={fechaFormateada} dlink={juego[0].download_link} desarrollador={juego[0].developer} requirements={juego[0].requirements}/>
    </Layout>
  )
}