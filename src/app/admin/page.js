import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'

const Admin = () => {
  return (
    <Layout>
      <div className='flex flex-col justify-center items-center gap-y-4 py-6'>
        <Link href={'/admin/create'} className='flex'>
          <button className='bg-blue-500 text-white rounded px-4'>Create</button>
        </Link>
        <Link href={'/admin/update'} className='flex'>
          <button className='bg-green-500 text-white rounded px-4'>Update</button>
        </Link>
        <Link href={'/admin/delete'} className='flex'>
          <button className='bg-red-500 text-white rounded px-4'>Delete</button>
        </Link>
      </div>
    </Layout>
  )
}

export default Admin
