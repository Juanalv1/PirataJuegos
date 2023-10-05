
import Link from "next/link"
import SearchBar from "./SearchBar"

export default function navbar () {
  return(
    <div className="bg-[#FFC93C] p-2 flex justify-between items-center px-4 border-b border-b-black ">
     <div>
      <Link href={'/'}>
      <img src="/Logo.svg" className="w-20 h-12"/>
      </Link>
      </div>
      <SearchBar />
      <div className="mr-20 ">
        <ul className="flex font-medium gap-3 text-lg m-0">
          <li>
            Categorias
          </li>
          <li>
            Contacto
          </li>
          <li>
            Pedidos
          </li>
          <li>
            Programas
          </li>
        </ul>
      </div>
    </div>
  )
}