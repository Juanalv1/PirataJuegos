"use client"
import { useAppContext } from '@/app/Context/AppContext'
import Card from '@/components/Card'
import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'

const SearchPage = ({params}) => {
  const {posts} = useAppContext()
  const {titulo} = params
  const tituloDecodificado = decodeURIComponent(titulo);
  const [filteredResults, setFilteredResults] = useState([]);
  const [noResults, setNoResults] =useState(false)

  
   useEffect(() => {
    if (posts) {
      const filteredRes = posts.filter((post) => post.post_title.toUpperCase().includes(tituloDecodificado.toUpperCase()));
      setFilteredResults(filteredRes);
      if (filteredRes.length == 0) {
        setNoResults(true)
      } else {
        setNoResults(false)
      }
    }else {
      setNoResults(true)
    }

  }, [posts]); 
  
  

  return (
    <Layout>
      <div className='font-Quato p-2 '>
        {noResults && (
          <p className='font-bold text-lg'>No hay resultados para tu Busqueda</p>
        )}
        {filteredResults.length > 0 && (<h1 className='font-Quato font-bold text-lg'>{`Resultados Para: ${tituloDecodificado}`}</h1>)}
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 place-items-center'>
          {filteredResults && filteredResults.map((post, index) => (
            <Card key={index} titulo={post.post_title} categorias={post.categories} image={post.img_url} version={post.version}/>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default SearchPage
