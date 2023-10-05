"use client"

import Link from "next/link"
import CategoryBubble from "./CategoryBubble"

export default function Card ({titulo, categorias, version, image}) {

  return (
    <div className="bg-[#FFC93C] m-2  cursor-pointer w-52 flex flex-col shadow rounded-lg  border-black border-2 h-60 font-Quato">
      <Link href={`/juegos/${titulo}`}>
        <img src={image} className="rounded-t-lg shadow h-28 w-full"/>
          <div className="w-full flex flex-col p-2 py-4 h-full">
            <h1 className="font-semibold text-lg">{titulo}  {version}</h1>
            <div className="flex">
            {categorias.map((categoria, index) => (        
            <CategoryBubble categoria={categoria} key={index}/>
            ))}
            </div>
          </div>
      </Link>
    </div>
  )
}