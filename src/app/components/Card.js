import Link from "next/link"
import CategoryBubble from "./CategoryBubble"
import Image from "next/image";


export default function Card ({titulo, categorias, version, image}) {
  const linkTitulo = titulo.replace(/ /g, "-");
  return (
    <article className="bg-[#FFC93C] m-2  cursor-pointer w-56 flex flex-col shadow rounded-lg  border-black border-2 h-60 font-Quato flex-wrap relative">
      <Link href={`/juegos/${linkTitulo}`} className="w-full h-full">
        <div className="relative">
          <Image src={image} className="rounded-t-lg shadow h-28 w-full" alt={titulo} fill={true}/>
        </div>
       <div className="w-full flex flex-col p-2  justify-between h-[50%] ">
            <h1 className="font-semibold text-lg">{titulo}  {version}</h1>
            <div className="flex items-end h-full flex-wrap">
            {categorias.map((categoria, index) => (        
            <CategoryBubble categoria={categoria} key={index}/>
            ))}
            </div>
          </div>
      </Link>
    </article>
  )
}
