"use client"
import { useState } from "react"
import { AiOutlineSearch } from 'react-icons/ai'
import { useRouter } from 'next/navigation';
import "./../app/globals.css"

export default function SearchBar () {
  const [searchValue, setSearchValue ] = useState('')
  const router = useRouter();
  
  const handleSearchClick = () => {
    if (searchValue.length > 0){
      router.push(`/busqueda/${searchValue}`);
    } else{
      alert("Ingresar algo para buscar")
    }
  }

  const handleChange = (e) => {
    const inputValue = e.target.value
    setSearchValue(inputValue);
  }

  return(
    <div className="bg-white rounded-xl relative font-Quato z-10 w-full flex items-center justify-between px-4">
      <AiOutlineSearch className='h-5 w-8 px-1'/>
      <input
      type="text"
      value={searchValue}
      onChange={handleChange}
      placeholder=" Busca un juego..." className="px-4 w-full md:w-64 h-full rounded-lg border-none outline-none focus:outline-none outline-0" />
      <button className="flex  text-blue-700 font-medium pr-2" onClick={handleSearchClick}>Buscar</button>
    </div>
  )
}