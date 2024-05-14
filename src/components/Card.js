"use client"
import Link from "next/link"
import CategoryBubble from "./CategoryBubble"
import Image from "next/image";

export default function Card ({titulo, categorias, version, image}) {
  const linkTitulo = titulo.replace(/ /g, "-");
  const srcImg = image.slice(0,1)
  return (
    <article className="bg-[#FFC93C] m-2  cursor-pointer w-52 flex flex-col shadow rounded-lg  border-black border-2 h-56 font-Quato flex-wrap relative hover:bg-amber-500 hover:shadow-lg">
      <Link href={`/juegos/${linkTitulo}`} className="w-full h-full">
        <div className="relative w-full h-1/2 object-cover">
          <Image src={srcImg[0]} className="rounded-t-lg shadow object-cover rounded-lg h-full" alt={titulo} fill={true}/>
        </div>
       <div className="w-full flex flex-col p-2  justify-between h-[50%] ">
            <h2 className="font-semibold ">{titulo}  {version}</h2>
            <div className="flex items-end  flex-wrap gap-x-1">
            {categorias.map((categoria, index) => (        
            <CategoryBubble categoria={categoria.category_name} key={index}/>
            ))}
            </div>
          </div>
      </Link>
    </article>
  )
}
