import React from 'react'
import Link from 'next/link'

const CategoryItem = ({name}) => {
  return (
      <Link href={`/categorias/${name}`}>
        <li className='hover:text-blue-300 text-sm'>
          {name}
        </li>
      </Link>


  )
}

export default CategoryItem
