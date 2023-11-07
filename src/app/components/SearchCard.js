import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchCard({image, title}) {
  return (
    <Link href={`/juegos/${title}`}>
      <div className='w-full p-2 flex justify-between items-center h-18 border border-black
      rounded hover:bg-gray-300 z-40 bg-amber-400'>
        <div className='w-[59%] h-[90%]'>
          <h3 className='font-semibold text-sm'>{title}</h3>
        </div>
        <div className='w-[39%] h-[60%]'>
          <Image src={image} alt={title} width={140} height={70}/>
        </div>
      </div>
    </Link>
  )
}
