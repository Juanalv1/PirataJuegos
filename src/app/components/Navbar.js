"use client"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { useEffect, useState } from 'react'

export default function navbar () {
  const [results, setResults] = useState([])
  const [showCategories, setShowCategories] = useState(false)

  const fetchData = async () => {
    try {
      const res = await fetch('https://pirataback.vercel.app/api/categories');
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])
 

  return(
    <div className="bg-[#FFC93C] p-2 flex justify-between items-center px-4 border-b border-b-black font-Cinzel">
     <div className=''>
      <Link href={'/'}>
      <img src="/Logo.svg" className="w-20 h-12"/>
      </Link>
      </div>
      <SearchBar />
      <div className="mr-20 ">
        <ul className="flex font-medium gap-3 text-lg m-0 relative">
          <li className='cursor-pointer p-1  flex '  onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}>
            Categorias
          </li>
          {showCategories && results.length > 0 && (
        <ul className='absolute p-2 top-8 grid grid-auto-fit-[6rem] place-content-center items-center  w-96 bg-[#FFC93C] rounded border border-black shadow z-50'   onMouseEnter={() => setShowCategories(true)}
        onMouseLeave={() => setShowCategories(false)}>
          {results.map((category) => (
            <Link href={`/categorias/${category.category_name}`} key={category.category_id} >    
            <li className='text-sm hover:text-blue-700 '>{category.category_name}</li></Link>
          ))}
        </ul>
      )}
          <Link href={'/'}>
            <li className='p-1'>Home</li>
          </Link>
          <li className='p-1'>
            Contacto
          </li>
          <li className='p-1'>
            Pedidos
          </li>
          <li className='p-1'>
            Programas
          </li>
        </ul>
      </div>
      
    </div>
  )
}