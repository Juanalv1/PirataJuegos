
import Layout from "@/components/Layout"
import ListaJuegosCategorias from "@/components/ListaJuegosCategorias"

export default async function GamesList ({params}) {
  const categoria = decodeURIComponent(params.categoria);
  const getData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts?categories=${categoria}`)
      const resJSON = await res.json()
      return resJSON.flat()
    } catch (error) {
      console.error(error.message)
    }

    }
    const posts = await getData()
  return(

    <Layout>
      <h1 className="text-2xl font-bold font-Cinzel p-2">{categoria}</h1>
      {Array.isArray(posts) && posts.length >= 1 && (<ListaJuegosCategorias posts={posts} />)}
      {Array.isArray(posts) && posts.length == 0 && (<p>No se encontraron juegos con esta categoria</p>)}
    </Layout>

  )
}