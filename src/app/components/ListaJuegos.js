"use client"
import React, { useEffect, useState } from "react";
import Card from "./Card"
export default function ListaJuegos ({categoria}) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (categoria) {
      try {
        fetch(`https://piratajuegos.com/api/posts/categories/${categoria}`)
        .then((res) => res.json())
        .then((data )=> {
          setPosts(data.slice(0, 20))
        })
      } 
        catch (error) {
        console.error("Error fetching data:", error);
      }
    } else{
      try {
        fetch('https://piratajuegos.com/api/posts')
        .then((res) => res.json())
        .then((data )=> {
          setPosts(data.slice(0, 10))
        })
      } 
        catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
  }, []);

  return (
    <div className="grid grid-auto-fit-sm w-full items-center justify-center place-items-center">
    {posts && posts.map((post, index) => (
      <Card key={index} titulo={post.post_title} categorias={post.categories} image={post.img_url} version={post.version}/>
    ))}
    </div>
  )
}