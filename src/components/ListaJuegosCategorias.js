
import React from "react";
import Card from "./Card"
export default function ListaJuegosCategorias ({ posts }) {
  
  return (
    <div className="grid lg:grid-cols-5 place-items-center grid-cols-1 md:grid-cols-3">
    {posts && posts.map((post, index) => (
      <Card key={index} titulo={post.post_title} categorias={post.categories} image={post.img_url} version={post.version}/>
  ))}
    </div>
  )
}