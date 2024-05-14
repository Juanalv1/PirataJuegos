"use client"
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation'
import React, {useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importa el router de Next.js
import Layout from '@/components/Layout';
import { useAppContext } from '@/app/Context/AppContext';
import ErrorMesssage from '@/components/ErrorMessage';
import SuccessMesssage from '@/components/SuccessMessage';
const DynamicRichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false, // Evita que se renderice en el servidor
});


const CrearPublicacion =  () => {
  const { session } = useAppContext()
  const [editorText, setEditorText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    categories: [],
    images: [],
    size: '',
    version: '',
    developer: '',
    languages: [],
    dlink: '',
    date: '',
    videoId: '',
    rating: '',
    requirements: {
      minimos: {
        SO: '',
        Memoria: '',
        Almacenamiento: '',
        Graficos: '',
        Procesador: '',
      },
      recomendados: {
        SO: '',
        Memoria: '',
        Almacenamiento: '',
        Graficos: '',
        Procesador: '',
      },
    },
    createdAt: '',
  });
  useEffect(() => {
    setFormData({ ...formData, text: editorText });
  }, [editorText]);

  const [inputValue, setInputValue] = useState('');

  const router = useRouter(); // Inicializa el router de Next.js
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  const [rawLanguages, setRawLanguages] = useState([])
  
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

  useEffect(() => {
    // Realiza una solicitud a la API para obtener las categorías
    fetchCategories()
    fetchLanguages()
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name == 'categories'){
    const listingCategories = [...formData.categories, value];
    setFormData({ ...formData, categories: listingCategories });
    console.log(listingCategories)
  }
    else if (name == 'languages'){
      const listingLanguages = [...formData.languages, value];
    setFormData({ ...formData, languages: listingLanguages });}
    // else if (name == 'images'){
    //   const listingImages = [...formData.images, value];
    // setFormData({ ...formData, images: listingImages });
    // }
    else{
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData.languages)
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    
  };
  const handleButtonClick = (e) => {
    e.preventDefault()
    const listingImages = [...formData.images, inputValue]
    setFormData({...formData, images: listingImages})
    setInputValue('')
    console.log('Valor del input:', inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(await response.json())
  
      if (response.status === 200) {
        setIsSuccess("Post creado exitosamente, redirigiendo en 5 segundos...")
        setTimeout(() => {
          setIsSuccess(null)
        }, 5000);
        router.push(`/juegos/${formData.title.replace(/ /g, "-")}`);
      } else {

        
      }
    } catch (error) {
      setIsError(error)
      setTimeout(() => {
        setIsError(null)
      }, 5000);
      console.error('Error de red al crear la publicación:', error);
    }
  };
  const ReqChange = (e) => {
    const {name, value} = e.target
    if (name.startsWith("M") ) {
      const fixedName = name.substring(1)
      setFormData({
        ...formData,
        requirements: {
          ...formData.requirements,
          minimos: {
            ...formData.requirements.minimos,
            [fixedName]: value,
          },
        },
      });
    } else if (name.startsWith("R")){
      const fixedName = name.substring(1)
      setFormData({
        ...formData,
        requirements: {
          ...formData.requirements,
          recomendados: {
            ...formData.requirements.recomendados,
            [fixedName]: value,
          },
        },
      });
    }
    console.log(formData.requirements)
  }
  useEffect(() => {
    if(!session){
      redirect('/login')
    }
  }, [session])

    return (
      <Layout>
        {isError && (<ErrorMesssage text={isError}/>)}
        {isSuccess && (<SuccessMesssage text={isSuccess}/>)}
        <div className='w-full flex flex-col p-4'>
       <h1 className='font-bold text-2xl my-4'>Crear Nueva Publicación</h1>
        <form onSubmit={handleSubmit} className='p-2  gap-3 font-Quato w-full flex-wrap flex flex-col'>
        <div className=' flex gap-x-2 flex-col'>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className='p-1 rounded'
          />
      </div>
      <div className='flex flex-col gap-y-2'>
        <ul>
        {formData.images.map((image, index) => (
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
          value={editorText}
          onChange={setEditorText}
          toolbar={["bold", "italic", "underline", "strikethrough", "link", "image"]}
          className=' h-96'
        />

      </div>
      <div className='flex flex-col'>
        <label htmlFor="size">Tamaño</label>
        <input
          type="text"
          id="size"
          name="size"
          value={formData.size}
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
          value={formData.version}
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
          value={formData.developer}
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
              value={formData.date}
              onChange={handleChange}
              className='p-1 rounded'
            />
          </div>
        
          <div className='flex flex-col gap-y-2'>
            <label htmlFor="categories" className='text-lg'>Categorías:</label>
            <select
              id="categories"
              name="categories"
              onChange={handleChange}
            >
              <option value="" key={'seleccion'}>{formData.categories}</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
            <ul>
            {formData.categories.map((cat) => (
              <li key={cat}>{categories.find(c => c.category_id == cat).category_name}</li>
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
              {formData.languages.map((lang) => (
                <li key={lang}>{rawLanguages.find(l => l.lang_id == lang).lang_name}</li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col gap-y-2'>
            <label htmlFor="rating">Rating</label>
            <input
              type="text"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className='p-1 rounded'
            />
          </div>
      </div>

      <div className='flex flex-col'>
        <label htmlFor="dlink">Link de descarga</label>
        <input
          type="text"
          id="dlink"
          name="dlink"
          value={formData.dlink}
          onChange={handleChange}
          className='p-1 rounded'
        />
      </div>

      <div className='flex flex-col'>
        <label htmlFor="videoId">Video ID</label>
        <input
          type="text"
          id="videoId"
          name="videoId"
          value={formData.videoId}
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
            <input type='text' id='MSO' name='MSO' value={formData.requirements.minimos.SO} onChange={ReqChange} className='rounded p-0.5'/>
            </div>
            <div className='flex gap-x-4 my-2'>
            <label htmlFor='MProcesador'>Procesador</label>
            <input type='text' id='MProcesador' name='MProcesador' value={formData.requirements.minimos.Procesador} onChange={ReqChange} className='rounded p-0.5'/>
            </div>
            <div className='flex gap-x-4 my-2'>
            <label htmlFor='MMemoria'>Memoria</label>
            <input type='text' id='MMemoria' name='MMemoria' value={formData.requirements.minimos.Memoria} onChange={ReqChange} className='rounded p-0.5'/>
            </div>
            <div className='flex gap-x-4 my-2'>
            <label htmlFor='MGraficos'>Graficos</label>
            <input type='text' id='MGraficos' name='MGraficos' value={formData.requirements.minimos.Graficos} onChange={ReqChange} className='rounded p-0.5'/>
            </div>
            <div className='flex gap-x-4 my-2'>
            <label htmlFor='MAlmacenamiento'>Almacenamiento</label>
            <input type='text' id='MAlmacenamiento' name='MAlmacenamiento' value={formData.requirements.minimos.Almacenamiento} onChange={ReqChange} className='rounded p-0.5'/>
            </div>
          </div>
        </div>

        <div>

          <div>
            <h4 className='text-lg font-semibold my-2'>Recomendados</h4>
            <div className='flex gap-x-4 my-2'>
            <label htmlFor='RSO'>SO</label>
            <input type='text' id='RSO' name='RSO' value={formData.requirements.recomendados.SO} onChange={ReqChange} className='rounded p-0.5'/>
            </div>
            <div className='flex gap-x-4 my-2'>
            <label htmlFor='RProcesador'>Procesador</label>
            <input type='text' id='RProcesador' name='RProcesador' value={formData.requirements.recomendados.Procesador} onChange={ReqChange} className='rounded p-0.5'/>
            </div>
            <div className='flex gap-x-4 my-2'>
            <label htmlFor='RMemoria'>Memoria</label>
            <input type='text' id='RMemoria' name='RMemoria' value={formData.requirements.recomendados.Memoria} onChange={ReqChange} className='rounded p-0.5'/>
            </div>
            <div className='flex gap-x-4 my-2'>
            <label htmlFor='RGraficos'>Graficos</label>
            <input type='text' id='RGraficos' name='RGraficos' value={formData.requirements.recomendados.Graficos} onChange={ReqChange} className='rounded p-0.5'/>
            </div>
            <div className='flex gap-x-4 my-2'>
            <label htmlFor='RAlmacenamiento'>Almacenamiento</label>
            <input type='text' id='RAlmacenamiento' name='RAlmacenamiento' value={formData.requirements.recomendados.Almacenamiento} onChange={ReqChange} className='rounded p-0.5'/>
            </div>
          </div>
        </div>

      </div>

      <div className='flex w-full justify-center'>
        <button type="submit" className='bg-green-600 rounded-lg text-white font-semibold p-2 px-20'>Crear post</button>
      </div>
    </form>
    </div>
      </Layout>
    )
  
  
};

export default CrearPublicacion