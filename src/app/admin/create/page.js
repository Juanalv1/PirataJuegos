"use client"
import dynamic from 'next/dynamic';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importa el router de Next.js
import Home from '@/app/components/BtnHome';
import Layout from '@/app/components/Layout';
import { UserProvider, useUser } from '@/app/userContext';
const DynamicRichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false, // Evita que se renderice en el servidor
});






const CrearPublicacion = () => {
  const { token } = useUser()
  const [editorText, setEditorText] = useState("");



  const aLanguages = [
    "Inglés ",
    "Español ",
    "Francés ",
    "Alemán ",
    "Italiano ",
    "Portugués ",
    "Japonés ",
    "Chino ",
    "Coreano ",
    "Ruso ",
    "Árabe ",
    "Polaco ",
    "Holandés ",
    "Sueco ",
    "Noruego ",
    "Danés ",
    "Finlandés ",
    "Húngaro ",
    "Checo ",
    "Turco "
  ];
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
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
  

  useEffect(() => {
    // Realiza una solicitud a la API para obtener las categorías
    fetch('http://piratajuegos.com/api/categories')
      .then(res => res.json())
      .then((data) => {
        setCategorias(data); // Actualiza el estado con las categorías
      })
      .catch((error) => {
        console.error('Error al obtener las categorías', error);
      });
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
      const response = await fetch('https://pirataback.vercel.app/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
  
      if (response.status === 201) {
        // La publicación se creó exitosamente, puedes redirigir al usuario a la página de detalle de la publicación
        alert('Creado exitosamente, 201')
        router.push(`/juegos/${formData.title}`);

      } else {

        
      }
    } catch (error) {
      alert('Error al crear el post')
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

  return (

      <Layout>
        <div className='w-full flex flex-col'>
       <h1 className='font-bold text-xl'>Crear Nueva Publicación</h1>
        <form onSubmit={handleSubmit} className='p-2 flex  gap-3 font-Quato w-full flex-wrap'>
        <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
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
      />
      <button onClick={handleButtonClick}>Enviar</button>
      </div>
      <div>
        
      <DynamicRichTextEditor
        value={editorText}
        onChange={setEditorText}
        toolbar={["bold", "italic", "underline", "strikethrough", "link", "image"]}
      />
        <label htmlFor="text">Descripcion: </label>
      </div>
      {/* Repite estos bloques para cada estado */}
      <div>
        <label htmlFor="categories">Categorías:</label>
        <p>{formData.categories}</p>
        <select
          id="categories"
          name="categories"
          onChange={handleChange}
        >
          <option value="" key={'seleccion'}>{formData.categories}</option>
          {categorias.map((category) => (
            <option key={category.category_id} value={category.category_name}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      {/* ... */}
      <div className='flex flex-col'>
        <label htmlFor="size">Tamaño</label>
        <input
          type="text"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
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
        />
      </div>
      <div >
        <p>Lenguages seleccionados {formData.languages}</p>
        <label htmlFor="languages">Idiomas</label>
        <select
          id="languages"
          name="languages"
          onChange={handleChange}>
        <option value="" key="seleccion">Selecciona un idioma </option>
          {aLanguages.map((language) => (
          <option key={language} value={language}>
          {language}
          </option>
  ))}
</select>
      </div>
      <div className='flex flex-col'>
        <label htmlFor="dlink">Link de descarga</label>
        <input
          type="text"
          id="dlink"
          name="dlink"
          value={formData.dlink}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
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
        />
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <input
          type="text"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>
            <div className='flex w-full self-center text-center items-center justify-center text-xl font-bold'>
            <h3 className='text-center '>Requisitos</h3>
            </div>
          

      <div className='w-full flex'>
        

        <div className='flex gap-4'>
          <h4>Minimos</h4>
          <div>
            <div>
            <label htmlFor='MSO'>SO</label>
            <input type='text' id='MSO' name='MSO' value={formData.requirements.minimos.SO} onChange={ReqChange}/>
            </div>
            <div>
            <label htmlFor='MProcesador'>Procesador</label>
            <input type='text' id='MProcesador' name='MProcesador' value={formData.requirements.minimos.Procesador} onChange={ReqChange}/>
            </div>
            <div>
            <label htmlFor='MMemoria'>Memoria</label>
            <input type='text' id='MMemoria' name='MMemoria' value={formData.requirements.minimos.Memoria} onChange={ReqChange}/>
            </div>
            <div>
            <label htmlFor='MGraficos'>Graficos</label>
            <input type='text' id='MGraficos' name='MGraficos' value={formData.requirements.minimos.Graficos} onChange={ReqChange}/>
            </div>
            <div>
            <label htmlFor='MAlmacenamiento'>Almacenamiento</label>
            <input type='text' id='MAlmacenamiento' name='MAlmacenamiento' value={formData.requirements.minimos.Almacenamiento} onChange={ReqChange}/>
            </div>
          </div>
        </div>
        <div>
          <h4>Recomendados</h4>
          <div>
            <div>
            <label htmlFor='RSO'>SO</label>
            <input type='text' id='RSO' name='RSO' value={formData.requirements.recomendados.SO} onChange={ReqChange}/>
            </div>
            <div>
            <label htmlFor='RProcesador'>Procesador</label>
            <input type='text' id='RProcesador' name='RProcesador' value={formData.requirements.recomendados.Procesador} onChange={ReqChange}/>
            </div>
            <div>
            <label htmlFor='RMemoria'>Memoria</label>
            <input type='text' id='RMemoria' name='RMemoria' value={formData.requirements.recomendados.Memoria} onChange={ReqChange}/>
            </div>
            <div>
            <label htmlFor='RGraficos'>Graficos</label>
            <input type='text' id='RGraficos' name='RGraficos' value={formData.requirements.recomendados.Graficos} onChange={ReqChange}/>
            </div>
            <div>
            <label htmlFor='RAlmacenamiento'>Almacenamiento</label>
            <input type='text' id='RAlmacenamiento' name='RAlmacenamiento' value={formData.requirements.recomendados.Almacenamiento} onChange={ReqChange}/>
            </div>
          </div>
        </div>

      </div>
      <div>
        <button type="submit">Actualizar</button>
      </div>
      <Home />
    </form>
    </div>
      </Layout>

      


  );
};

export default CrearPublicacion