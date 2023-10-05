"use client"
import { useState, useEffect } from "react"
import SearchCard from "./SearchCard";

export default function SearchBar () {
  const [searchValue, setSearchValue ] = useState('')
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showAllResults, setShowAllResults] = useState(false);
  useEffect( () =>  {
    // Llama a fetchData cuando se monta el componente
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await fetch('https://pirataback.vercel.app/api/posts');
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  

  const handleChange = (e) => {
    const inputValue = e.target.value
    setSearchValue(inputValue);
    const filtered = results.filter((post) =>
    post.post_title.toUpperCase().includes(inputValue.toUpperCase())
  )
  setShowAllResults(false); // Ocultar la lista completa al escribir;
  setFilteredResults(filtered);
  }
  console.log(filteredResults)
  return(
    <div className="bg-white rounded relative font-Quato w-2/5">
      <input
      type="text"
      value={searchValue}
      onChange={handleChange}
      placeholder="Busca un juego" className="p-2 rounded w-full">
      </input>
       {searchValue && (
        <button
          className="absolute right-4 top-2 text-blue-900 font-bold"
          onClick={() => setSearchValue("")}
        >
          Borrar
        </button>
      )}
      {filteredResults.length > 0 && searchValue && (
        <div className="absolute bg-white p-2  shadow-md ">
          {showAllResults
            ? filteredResults.map((result, index) => (
                <SearchCard key={index} image={result.img_url[0]} title={result.post_title} />
              ))
            : filteredResults.slice(0, 5).map((result, index) => (
                <SearchCard key={index} image={result.img_url[0]} title={result.post_title} />
              ))}
          {filteredResults.length > 5 && !showAllResults && (
            <button
              className="text-blue-500 mt-2"
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