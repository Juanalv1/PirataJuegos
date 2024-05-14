"use client"
import React from 'react';
import SliderContainer from './SliderContainer';
import { useAppContext } from '@/app/Context/AppContext';


const RelatedGames = ({categorias}) => {
  const { posts } = useAppContext()
  let postsMapeados = []
  const categoriasMapeadas = categorias.map((categoria) => (
    categoria.category_name
  ))
  if (posts) {
    categoriasMapeadas.forEach(categoria => {
      const filtered = posts.filter(post => post.categories.some(cat => cat.category_name === categoria));
      postsMapeados = [...postsMapeados, ...filtered];
    });
  }

  return (
    <div className=' font-Quato px-8 mt-4 w-full border-t border-t-black'>
      <h2 className='text-xl font-bold pt-5 pb-3'>Juegos que quiza te gusten</h2>
      {postsMapeados && postsMapeados.length >=1 && (<SliderContainer games={postsMapeados}/>)}
    </div>
  )
}

export default RelatedGames
