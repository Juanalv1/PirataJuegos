import { useEffect, useState } from "react";
import Card from "./Card"
export default function ListaJuegos () {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      try {
        fetch('https://pirataback.vercel.app/api/posts')
        .then((res) => res.json())
        .then((data )=> {
          setPosts(data)
        })
      } 
        catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" flex">
    {posts && posts.map((post, index) => (
      <Card key={index} titulo={post.post_title} categorias={post.categories} image={post.img_url} version={post.version}/>
    ))}
    </div>
  )
}