import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchCard({image, title}) {
  return (
    <Link href={`/juegos/${title}`}>
      <div className='w-full p-2 flex justify-between items-center h-18 border border-black
      rounded hover:bg-gray-300 relative'>
        <div className='w-[60%] h-[90%]'>
          <h3 className='font-semibold text-sm'>{title}</h3>
        </div>
        <div className='w-[40%] h-[90%] flex justify-center items-center relative'>
          <Image src={image} className='w-full object-cover h-full ' alt={title} fill={true}/>
        </div>
      </div>
    </Link>
  )
}
