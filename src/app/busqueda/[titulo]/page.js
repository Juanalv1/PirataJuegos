"use client"

import Card from '@/app/components/Card'
import Layout from '@/app/components/Layout'
import ListaJuegos from '@/app/components/ListaJuegos'
import React, { useEffect, useState } from 'react'



const SearchPage = ({params}) => {
  const {titulo} = params
  const [filteredResults, setFilteredResults] = useState([]);
  const [noResults, setNoResults] =useState(false)

  
   useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(`https://piratajuegos.com/api/posts`);
        const res = await req.json();
        const filteredRes = res.filter((post) => post.post_title.toUpperCase().includes(titulo.toUpperCase()));
        
        setFilteredResults(filteredRes);
  
        // Mueve la lógica de verificación aquí, después de que el estado haya sido actualizado
        if (filteredRes.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
      } catch (error) { // Aquí debe ser 'error', no 'e', para que coincida con el nombre en el catch
        console.error('Error al obtener datos:', error);
      }
    };
  
    fetchData();
  }, [titulo]); // Dependencia cambiada a 'titulo' porque es lo que realmente impacta cuando se debe llamar a fetchData
  
  

  return (
    <Layout>
      <div className='font-Quato p-2 '>
        {noResults && (
          <p className='font-bold text-lg'>No hay resultados para tu Busqueda</p>
        )}
        {filteredResults.length > 0 && (<h1 className='font-Quato font-bold text-lg'>{`Resultados Para: ${titulo}`}</h1>)}
        <div className='grid grid-auto-fit-sm place-items-center'>
          {filteredResults && filteredResults.map((post, index) => (
            <Card key={index} titulo={post.post_title} categorias={post.categories} image={post.img_url} version={post.version}/>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default SearchPage
