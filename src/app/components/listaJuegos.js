import Card from "./card"
export default async function ListaJuegos () {
  const fetchData = async () => {
    const res = await fetch('https://pirataback.vercel.app/api/posts')
    return await res.json()
  
  }
  const posts = await fetchData()

  return (
    <div className=" flex">
    {posts.map((post, index) => (
      <Card key={index} titulo={post.post_title} categorias={post.categories} image={post.img_url} version={post.version}/>
    ))}
    </div>
  )
}