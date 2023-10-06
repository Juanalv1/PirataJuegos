import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchCard({image, title}) {
  return (
    <Link href={`/juegos/${title}`}>
      <div className='w-full p-2 flex justify-between items-center'>
        <div>
          <h3 className='font-semibold'>{title}</h3>
        </div>
        <div className='w-[40%] h-[90%]'>
          <img src={image} className='w-full'/>
        </div>
      </div>
    </Link>
  )
}
