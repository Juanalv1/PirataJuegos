"use client"
import Link from "next/link"
import Image from "next/image"
import SearchBar from "./SearchBar"
import { useEffect, useState } from 'react'
import { useAppContext } from "../app/Context/AppContext"
import {BiMenu} from 'react-icons/bi'
import SideMenu from "./SideMenu"
import { useRouter } from "next/navigation"

export default function Navbar () {
  const router = useRouter()
  const [results, setResults] = useState([])
  const [showCategories, setShowCategories] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [clickCounter, setClickCounter] = useState(0)
  const { session, setSession } = useAppContext()
  const [isDev, setIsDev] = useState(false)


  const fetchSession = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/auth/login`)
      const data = await res.json()
      if (res.ok) {
        setSession(data)
      }
    } catch (error) {
    }
  }
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/categories`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error al obtener las categorias:', error);
    }
  };
  useEffect(() => {
    fetchSession()
    fetchCategories()
  }, [])

  const handleLogOut = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/auth/logout`)
    if (res.ok) {
      setSession(null)
      router.push('/')
    }
  }
  const handleMenuClick = () => {
  if(!showMenu){
    setShowMenu(true)
  }else {
    setShowMenu(false)
  }
  }
  const handleClick = () => {
  if (clickCounter == 5){
    setIsDev(true)
  } else{
    setClickCounter(clickCounter + 1)
  }
  }
  return(
    <div className="bg-[#FFC93C] p-2 flex justify-between items-center px-4 border-b border-b-black font-Cinzel w-full ">
     <div className=''>
      <Image src="/Logo.svg" width={60} height={40} onClick={handleClick} alt="Piratajuegos Logo"/>
      </div>
      <div className="hidden sm:flex">
      <SearchBar />

      </div>
     
      <div className="hidden sm:flex">
        <ul className="flex font-medium gap-3 text-lg m-0 relative items-center mr-2">
        <li className='cursor-pointer p-1  flex relative'  onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}>
            Categorias
            {showCategories && results.length > 0 && (
        <ul className='absolute p-2 top-10 grid grid-auto-fit-[6rem] place-content-center items-center  w-96 bg-[#FFC93C] rounded border border-black shadow z-50 '   onMouseEnter={() => setShowCategories(true)}
        onMouseLeave={() => setShowCategories(false)}>
          {results.map((category) => (
            <Link href={`/categorias/${category.category_name}`} key={category.category_id} >    
            <li className='text-sm hover:text-blue-700 '>{category.category_name}</li></Link>
          ))}
        </ul>
      )}
          </li>
          <Link href={'/'}>
            <li className='p-1'>Home</li>
          </Link>
          

        <Link href={'/dmca'}>
            <li className='p-1'>DMCA</li>
        </Link>
        {session && (
            <Link href={"/admin"}>
              <li className="p-1">Admin</li>
            </Link>
        )}

      {isDev && (
          <>
            <Link href={"/login"}>
              <li className="p-1">Login</li>
            </Link>
          </>
        )}

      {session && (
          <>
            <li className="p-1">{session}</li>
            <li className="p-1 text-red-500 cursor-pointer" onClick={handleLogOut}>Logout</li>
         </>
        )}
        </ul>

         
      </div>
      {showMenu && (
          <SideMenu showMeu={showMenu} setShowMenu={setShowMenu}/>
        )}
      <div className="sm:hidden ">        
           <BiMenu className="w-9 h-9 cursor-pointer" onClick={handleMenuClick}/>
          </div>
    </div>
  )
}