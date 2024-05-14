"use client"
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout'
import SuccessMesssage from '@/components/SuccessMessage';
import ErrorMesssage from '@/components/ErrorMessage';
const DynamicRichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false, // Evita que se renderice en el servidor
});

const Update = () => {
  const router = useRouter()
  const [post, setPost] = useState()
  const [isSuccess, setIsSuccess] = useState()
  const [isError, setIsError] = useState()
  const [editorText, setEditorText] = useState("");
  const [id, setId] = useState()
  const [inputValue, setInputValue] = useState('');

  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  const [rawLanguages, setRawLanguages] = useState([])

  useEffect(() => {
    if (post) {
      setPost({ ...post, post_text: editorText })
    }
    }, [editorText]);

  useEffect(() => {
    // Realiza una solicitud a la API para obtener las categorías
    fetchCategories()
    fetchLanguages()
  }, []); 

  const handleFetchPost = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts/id/${id}`)
      const resJSON = await res.json()
      setPost(resJSON)
    } catch (error) {
      setIsError(error.error.message)
      setTimeout(() => {
        setIsError(null)
      }, 5000);
    }
  }

  const fetchCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/categories`)
    const data = await res.json()
    setCategories(data)
  }
  const fetchLanguages = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/languages`)
    const data = await res.json()
    setRawLanguages(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(post)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      const resJSON = await response.json()
  
      if (response.status === 200) {
        setIsSuccess("Post Actualizado exitosamente, redirigiendo en 5 segundos...")
        setTimeout(() => {
          setIsSuccess(null)
        }, 5000);
        router.push(`/juegos/${post.title.replace(/ /g, "-")}`);
      } else {

        
      }
    } catch (error) {
      setIsError(error)
      setTimeout(() => {
        setIsError(null)
      }, 5000);
      console.error('Error al actualizar el óst:', error);
    }
  };

  const ReqChange = (e) => {
    const {name, value} = e.target
    if (name.startsWith("M") ) {
      const fixedName = name.substring(1)
      setPost({
        ...post,
        requirements: {
          ...post.requirements,
          minimos: {
            ...post.requirements.minimos,
            [fixedName]: value,
          },
        },
      });
    } else if (name.startsWith("R")){
      const fixedName = name.substring(1)
      setPost({
        ...post,
        requirements: {
          ...post.requirements,
          recomendados: {
            ...post.requirements.recomendados,
            [fixedName]: value,
          },
        },
      });
    }
    console.log(post.requirements)
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleButtonClick = (e) => {
    e.preventDefault()
    const listingImages = [...post.images, inputValue]
    setPost({...post, images: listingImages})
    setInputValue('')
    console.log('Valor del input:', inputValue);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name == 'categories'){
    const listingCategories = [...post.categories, {category_id: value}];
    setPost({ ...post, categories: listingCategories });
    console.log(listingCategories)
  }
    else if (name == 'languages'){
      const listingLanguages = [...post.languages, {lang_id: value}];
    setPost({ ...post, languages: listingLanguages });}
    // else if (name == 'images'){
    //   const listingImages = [...post.images, value];
    // setPost({ ...post, images: listingImages });
    // }
    else{
      setPost({ ...post, [name]: value });
    }
    console.log(post.languages)
  }

  return (
    <Layout>
      <div className="flex flex-col p-4 gap-y-2">
        {isSuccess && (<SuccessMesssage text={isSuccess}/>)}
        {isError && (<ErrorMesssage text={isError}/>)}
        <h1>Actualizar Publicacion Publicacion</h1>
        {!post && (
        <>
          <input type="number" onChange={(e) => setId(e.target.value)} ></input>
          <button onClick={() => {
            handleFetchPost()
          }} className="bg-green-500 text-white p-2 rounded">Fetch post
          </button>
        </>
      )}
      {post && (
        <form onSubmit={handleSubmit} className='p-2  gap-3 font-Quato w-full flex-wrap flex flex-col'>
          <div className=' flex gap-x-2 flex-col'>
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.post_title}
              onChange={handleChange}
              className='p-1 rounded'
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <ul>
            {post.img_url && post.img_url.map((image, index) => (
              <li key={index}>{image} {index}</li>
              ))}</ul>
              <label htmlFor="images">Imagen url</label>
              <input
                type="text"
                onChange={handleInputChange}
                placeholder="imagen url"
                value={inputValue}
                className='p-1 rounded'
              />
              <button onClick={handleButtonClick} className='bg-green-600 text-white p-2 rounded font-semibold mx-64 mt-2'>Añadir Url</button>
              </div>
              <div className='flex flex-col gap-y-2'>
                <label htmlFor="text">Descripcion: </label>
                <DynamicRichTextEditor
                  value={post.post_text}
                  onChange={setEditorText}
                  toolbar={["bold", "italic", "underline", "strikethrough", "link", "image"]}
                  className=' min-h-96'
                />
        
              </div>
              <div className='flex flex-col'>
                <label htmlFor="size">Tamaño</label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={post.size}
                  onChange={handleChange}
                  className='p-1 rounded'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="version">Version</label>
                <input
                  type="text"
                  id="version"
                  name="version"
                  value={post.version}
                  onChange={handleChange}
                  className='p-1 rounded'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="developer">developer</label>
                <input
                  type="text"
                  id="developer"
                  name="developer"
                  value={post.developer}
                  onChange={handleChange}
                  className='p-1 rounded'
                />
              </div>
        
              <div className='flex gap-x-4 w-full justify-center'>
                  <div className='flex flex-col'>
                    <label htmlFor="date">Fecha</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={post.date}
                      onChange={handleChange}
                      className='p-1 rounded'
                    />
                  </div>
                
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor="categories" className='text-lg'>Categorías:</label>
                  {post.categories && (<select
                      id="categories"
                      name="categories"
                      onChange={handleChange}
                    >
                      <option value="" key={'seleccion'}>{post.categories.category_name}</option>
                      {categories.map((category) => (
                        <option key={category.category_id} value={category.category_id}>
                          {category.category_name}
                        </option>
                      ))}
                    </select>)}
                    <ul>
                    {post.categories && post.categories.map((cat, index) => (
                      <li key={index}>{categories.find(c => c.category_id == cat.category_id).category_name}</li>
                    ))}
                  </ul>
                  </div>
        
                  <div >
                    <div className='flex flex-col gap-y-2'>
                    <label htmlFor="languages" className='text-lg'>Idiomas</label>
                    <select
                      id="languages"
                      name="languages"
                      onChange={handleChange}>
                    <option value="" key="seleccion">Selecciona un idioma </option>
                      {rawLanguages.map((language) => (
                      <option key={language.lang_id} value={language.lang_id}>
                      {language.lang_name}
                      </option>))}
                    </select>
                    </div>
                    <ul>
                      {post.languages && post.languages.map((lang, index) => (
                        <li key={index}>{rawLanguages.find(l => l.lang_id == lang.lang_id).lang_name}</li>
                      ))}
                    </ul>
                  </div>
        
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor="rating">Rating</label>
                    <input
                      type="text"
                      id="rating"
                      name="rating"
                      value={post.rating}
                      onChange={handleChange}
                      className='p-1 rounded'
                    />
                  </div>
              </div>
        
              <div className='flex flex-col'>
                <label htmlFor="dlink">Link de descarga</label>
                <input
                  type="text"
                  id="download_link"
                  name="download_link"
                  value={post.download_link}
                  onChange={handleChange}
                  className='p-1 rounded'
                />
              </div>
        
              <div className='flex flex-col'>
                <label htmlFor="videoId">Video ID</label>
                <input
                  type="text"
                  id="video_id"
                  name="video_id"
                  value={post.video_id}
                  onChange={handleChange}
                  className='p-1 rounded'
                />
              </div>
        
                    <div className='flex w-full self-center text-center items-center justify-center text-xl font-bold'>
                    <h3 className='text-center '>Requisitos</h3>
                    </div>
                  
        
              <div className='w-full flex gap-x-2 justify-center'>
        
                <div className='flex gap-4'>
        
                  <div>
                  <h4 className='text-lg font-semibold my-2'>Minimos</h4>
                    <div className='flex gap-x-4 my-2'>
                    <label htmlFor='MSO'>SO</label>
                    <input type='text' id='MSO' name='MSO' value={post.requirements.minimos.SO} onChange={ReqChange} className='rounded p-0.5'/>
                    </div>
                    <div className='flex gap-x-4 my-2'>
                    <label htmlFor='MProcesador'>Procesador</label>
                    <input type='text' id='MProcesador' name='MProcesador' value={post.requirements.minimos.Procesador} onChange={ReqChange} className='rounded p-0.5'/>
                    </div>
                    <div className='flex gap-x-4 my-2'>
                    <label htmlFor='MMemoria'>Memoria</label>
                    <input type='text' id='MMemoria' name='MMemoria' value={post.requirements.minimos.Memoria} onChange={ReqChange} className='rounded p-0.5'/>
                    </div>
                    <div className='flex gap-x-4 my-2'>
                    <label htmlFor='MGraficos'>Graficos</label>
                    <input type='text' id='MGraficos' name='MGraficos' value={post.requirements.minimos.Graficos} onChange={ReqChange} className='rounded p-0.5'/>
                    </div>
                    <div className='flex gap-x-4 my-2'>
                    <label htmlFor='MAlmacenamiento'>Almacenamiento</label>
                    <input type='text' id='MAlmacenamiento' name='MAlmacenamiento' value={post.requirements.minimos.Almacenamiento} onChange={ReqChange} className='rounded p-0.5'/>
                    </div>
                  </div>
                </div>
        
                <div>
        
                  <div>
                    <h4 className='text-lg font-semibold my-2'>Recomendados</h4>
                    <div className='flex gap-x-4 my-2'>
                    <label htmlFor='RSO'>SO</label>
                    <input type='text' id='RSO' name='RSO' value={post.requirements.recomendados.SO} onChange={ReqChange} className='rounded p-0.5'/>
                    </div>
                    <div className='flex gap-x-4 my-2'>
                    <label htmlFor='RProcesador'>Procesador</label>
                    <input type='text' id='RProcesador' name='RProcesador' value={post.requirements.recomendados.Procesador} onChange={ReqChange} className='rounded p-0.5'/>
                    </div>
                    <div className='flex gap-x-4 my-2'>
                    <label htmlFor='RMemoria'>Memoria</label>
                    <input type='text' id='RMemoria' name='RMemoria' value={post.requirements.recomendados.Memoria} onChange={ReqChange} className='rounded p-0.5'/>
                    </div>
                    <div className='flex gap-x-4 my-2'>
                    <label htmlFor='RGraficos'>Graficos</label>
                    <input type='text' id='RGraficos' name='RGraficos' value={post.requirements.recomendados.Graficos} onChange={ReqChange} className='rounded p-0.5'/>
                    </div>
                    <div className='flex gap-x-4 my-2'>
                    <label htmlFor='RAlmacenamiento'>Almacenamiento</label>
                    <input type='text' id='RAlmacenamiento' name='RAlmacenamiento' value={post.requirements.recomendados.Almacenamiento} onChange={ReqChange} className='rounded p-0.5'/>
                    </div>
                  </div>
                </div>
        
              </div>
        
              <div className='flex w-full justify-center'>
                <button type="submit" className='bg-green-600 rounded-lg text-white font-semibold p-2 px-20'>Actualizar post</button>
              </div>
            </form>
      )

      }
      </div>
    </Layout>
  )
}

export default Update
