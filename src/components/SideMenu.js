import Link from 'next/link'
import React from 'react'
import SearchBar from './SearchBar'
import {IoMdClose} from 'react-icons/io'
import {AiOutlineSearch} from 'react-icons/ai'


const SideMenu = ({showMeu, setShowMenu}) => {
  return (
    <div className='absolute h-full w-2/3 bg-amber-400 right-0 top-0 z-50 flex flex-col px-2 sm:px-4 py-2 border-l border-l-black font-Quato'>
      <IoMdClose  className='w-6 h-6 self-end mb-1' onClick={() => setShowMenu(false)}/>
      <div className='flex w-full items-center justify-between'>
        
      <SearchBar />
        
      </div>
      <ul className='font-bold'>
      <Link href={'/'}>
        <li className='p-1'>Home</li>
      </Link>
      <Link href={'/categories'}>
      <li className='p-1'>Categorias</li>
      </Link>
      <Link href={'/dmca'}>
        <li className='p-1'>DMCA</li>
      </Link>
     
      </ul>
    </div>
  )
}

export default SideMenu
