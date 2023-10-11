import Link from "next/link"
import CategoryBubble from "./CategoryBubble"

export default function Card ({titulo, categorias, version, image}) {

  return (
    <div className="bg-[#FFC93C] m-2  cursor-pointer w-56 flex flex-col shadow rounded-lg  border-black border-2 h-60 font-Quato">
      <Link href={`/juegos/${titulo}`} className="w-full h-full">
        <div>
          <img src={image} className="rounded-t-lg shadow h-28 w-full"/>
        </div>
       <div className="w-full flex flex-col p-2  justify-between h-[50%]">
            <h1 className="font-semibold text-lg">{titulo}  {version}</h1>
            <div className="flex items-end h-full">
            {categorias.map((categoria, index) => (        
            <CategoryBubble categoria={categoria} key={index}/>
            ))}
            </div>
          </div>
      </Link>
    </div>
  )
}
