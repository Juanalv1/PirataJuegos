
import React from "react";
import Card from "./Card"
export default function ListaJuegos ({ posts }) {

  return (
    <div className="grid grid-auto-fit-sm w-full items-center justify-center place-items-center">
    {posts && posts.map((post, index) => (
      <Card key={index} titulo={post.post_title} categorias={post.categories} image={post.img_url} version={post.version}/>
  ))}
    </div>
  )
}