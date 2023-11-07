"use client"
import { useState, useEffect } from "react"
import SearchCard from "./SearchCard";
import { AiOutlineSearch } from 'react-icons/ai'
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';

export default function SearchBar () {
  const [searchValue, setSearchValue ] = useState('')
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showAllResults, setShowAllResults] = useState(false);
  const router = useRouter();
  useEffect( () =>  {
    // Llama a fetchData cuando se monta el componente
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await fetch('https://piratajuegos.com/api/posts');
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  
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
    const filtered = results.filter((post) =>
    post.post_title.toUpperCase().includes(inputValue.toUpperCase())
  )
  setShowAllResults(false); // Ocultar la lista completa al escribir;
  setFilteredResults(filtered);
  }

  return(
    <div className="bg-white rounded-xl relative font-Quato z-50 w-full flex items-center justify-between">
      <AiOutlineSearch className='h-5 w-8 px-1'/>
      <input
      type="text"
      value={searchValue}
      onChange={handleChange}
      placeholder=" Busca un juego..." className="px-1 w-full md:w-64 outline-none h-full border-none rounded-lg">
      </input>
      <button className="flex sm:hidden text-blue-900 font-bold pr-2" onClick={handleSearchClick}>Buscar</button>
      {filteredResults.length > 0 && searchValue && (
        <div className=" hidden md:flex absolute bg-amber-200 p-2 shadow-md rounded-b-md border border-black rounded flex-col gap-1 top-10">
          {showAllResults
            ? filteredResults.map((result, index) => (
                <SearchCard key={index} image={result.img_url[0]} title={result.post_title} />
              ))
            : filteredResults.slice(0, 5).map((result, index) => (
                <SearchCard key={index} image={result.img_url[0]} title={result.post_title} />
              ))}
          {filteredResults.length > 5 && !showAllResults && (
            <button
              className="mt-2"
              onClick={() => setShowAllResults(true)}
            >
              Ver más resultados
            </button>
          )}
        </div>
)}
    </div>
  )
}