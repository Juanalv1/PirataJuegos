"use client"
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CategoryList from './../components/CategoryList'

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
     const req = await fetch('https://piratajuegos.com/api/categories')
     const res = await req.json()
     setCategories(res)
    }
    fetchCategories()

  }, [])
  return (
    <Layout>
      <div className='px-3 py-2 font-Quato'>
        <h1 className='text-xl font bold'>Categorias</h1>
        {categories.length > 1 && (<CategoryList categories={categories}/>)}
        {categories.length < 1 && (
          <p>No hay categorias disponibles</p>
        )}
        
      </div>
    </Layout>
  )
}

export default CategoriesPage
