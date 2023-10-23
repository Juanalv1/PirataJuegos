"use client"

import {HiDownload} from "react-icons/hi"
import Carrusel from "./Carrusel"
import YouTube from "react-youtube"




export default function GamePage ({titulo, categoria, imagen, contenido, peso, idiomas, fechaLanzamiento, requirements, desarrollador, dlink, video_id}) 
{

  const opts = { 
    origin: 'http://localhost:3000',
    height: "390", 
    width: "640", 
    playerVars: {  
    }, 
  }; 
  const formattedRequirements = JSON.parse(requirements);
   // Elimina el primer elemento del array de imágenes
   const imageList = [...imagen.slice(1)];

  return(
    <div className="w-full flex font-Quato">
    <section className="w-2/3 p-6">
    <h1 className="text-5xl font-extrabold mb-6 text-center">{titulo}</h1>
      <div className="flex justify-center items-center rounded h-80 w-3/4 mx-auto">
        <Carrusel images={imageList} />
      </div>
      <div className="w-full mt-4 px-2  pt-2">
      <h2 className="text-lg my-4"><b>DESCARGA {titulo} Gratis por MEGA y MEDIAFIRE</b></h2>
        <p dangerouslySetInnerHTML={{ __html: contenido }} className="text-justify"></p>
      </div>
      <div className=" justify-center p-2 flex-col my-4">
        <h2 className="text-3xl font-bold my-4 ">TRAILER</h2>
        <div className="flex  w-full justify-center">
        {video_id && (<YouTube videoId={video_id} 
            opts={opts}/> )}
        </div>
      </div>
      <div className="my-4">
        <h4 className="text-2xl font-bold">Publicidad</h4>
        
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold my-4 ">INSTRUCCIONES DE DESCARGA</h2>
        <div className="flex">
        <ol className="w-[75%] flex flex-col gap-3">
          <li>
            1.- Haz click en el boton de <b>DESCARGAR</b>
          </li>
          <li>
            2.- Completa el Captcha y sigue las instrucciones
          </li>
          <li>
            3.- Accederas a los links de descarga asi como las instrucciones especificas de instalacion
          </li>
        </ol>

        <a href={dlink}>
        <button className="py-2 px-3 tracking-wider bg-[#0735B3] self-center rounded-xl font-bold text-white flex items-center gap-1 text-lg shadow" > <HiDownload className="w-6 mr-1 h-6"/> DESCARGAR </button>
        </a>
        </div>
      </div>
    </section>

    <aside className="w-1/3 border-l border-l-black">
      <div className="m-2 p-2">
        <h3 className="text-xl font-bold text-center">
          Detalles del Juego:
        </h3>
        <ul className="w-full px-6 py-2 flex flex-col gap-1">
          <li className="flex justify-between"><span className="font-semibold ">Peso:</span><span>{peso}</span> </li>
          <li className="flex justify-between"><span className="font-semibold mr-2">Idiomas:</span> <span>{idiomas}</span></li>
          <li className="flex justify-between"><span className="font-semibold mr-2">Fecha de lanzamiento:</span><span>{fechaLanzamiento}</span> </li>
          <li className="flex justify-between"><span className="font-semibold mr-2">Categorias: </span><span>{categoria}</span></li>
          <li className="flex justify-between"><span className="font-semibold mr-2">Desarrollador:</span><span>{desarrollador}</span></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold text-center"> Requisitos </h3>
        <div className="w-full">
          <div className="px-6 py-2">
          <h4 className="font-bold text-lg">Minimos:</h4>
          <ul className=" w-full  py-2 flex flex-col gap-1">
            <li><span className="font-semibold">Sistema operativo:</span><span className="ml-2">{formattedRequirements.minimos.SO}</span></li>
            <li><span className="font-semibold">Memoria RAM:</span><span className="ml-2">{formattedRequirements.minimos.Memoria}</span></li>
            <li><span className="font-semibold">Procesador:</span><span className="ml-2">{formattedRequirements.minimos.Procesador}</span></li>
            <li><span className="font-semibold">Graficos:</span><span className="ml-2">{formattedRequirements.minimos.Graficos}</span></li>
            <li><span className="font-semibold">Almacenamiento:</span><span className="ml-2">{formattedRequirements.minimos.Almacenamiento}</span></li>
          </ul>
          </div>
          <hr  className="bg-black"/>
          <div className="px-6 py-2">
          <h4 className="font-bold text-lg">Recomendados:</h4>
          <ul className=" w-full  py-2 flex flex-col gap-1">
            <li><span className="font-semibold">Sistema operativo:</span><span className="ml-2">{formattedRequirements.recomendados.SO}</span></li>
            <li><span className="font-semibold">Memoria RAM:</span><span className="ml-2">{formattedRequirements.recomendados.Memoria}</span></li>
            <li><span className="font-semibold">Procesador:</span><span className="ml-2">{formattedRequirements.recomendados.Procesador}</span></li>
            <li><span className="font-semibold">Graficos:</span><span className="ml-2">{formattedRequirements.recomendados.Graficos}</span></li>
            <li><span className="font-semibold">Almacenamiento:</span><span className="ml-2">{formattedRequirements.recomendados.Almacenamiento}</span></li>
          </ul>
          </div>
        </div>
      </div>
      <div>
        <h4>Publicidad</h4>

      </div>
    </aside>
    </div>
  )
}