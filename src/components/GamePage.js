"use client"
import {HiDownload} from "react-icons/hi"
import Carrusel from "./Carrusel"
import { YouTubeEmbed } from '@next/third-parties/google'
import RelatedGames from "./RelatedGames"
import SessionChecker from "./SessionChecker"

export default function GamePage ({juego}) {
    console.log(juego.post_id)
    let fechaBD 
    let dia 
    let mes
    let año
    let fechaFormateada
    let categories
    let imageList
    
    if (juego) {
      fechaBD = new Date(juego.date);
      dia = fechaBD.getDate(); // 
      mes = fechaBD.getMonth() + 1; // 
      año = fechaBD.getFullYear(); // 
      fechaFormateada = `${dia}/${mes}/${año}`;
      categories = juego.categories.map((cat) => cat.category_name)
      imageList = juego.img_url.slice(1);
    }



  return(
    <div className="w-full font-Quato items-center">
    {juego && (
      <section className="w-full py-2 px-1 flex flex-col">
      <div className="md:grid md:grid-cols-3 w-full border-b border-b-black ">
        <div className="md:col-span-2 mr-1 px-2">
          <div className="w-full h-52 sm:h-64 lg:h-80 xl:h-96">
          <SessionChecker juego={juego}/>
          <h1 className="text-xl md:text-3xl font-extrabold mb-6 text-center">{juego.post_title}</h1>
          <div className="flex justify-center items-center rounded h-[85%] w-[90%] mx-auto shadow-lg border border-stone-800">
              <Carrusel images={imageList} titulo={juego.post_title}/>
          </div>
        </div>

        <div className=" mt-4 px-6 pt-6 w-full">
          <h2 className="text-lg my-4"><b>DESCARGA {juego.post_title} Gratis por MEGA y MEDIAFIRE</b></h2>
            <p dangerouslySetInnerHTML={{ __html: juego.post_text }} className="text-justify"></p>
        </div>

        <div className=" flex justify-center p-2 flex-col my-4 w-full pb-6">
          <h3 className="text-3xl font-bold my-4 ">TRAILER</h3>
          {juego.video_id && <YouTubeEmbed videoid={juego.video_id} className="mx-auto" style="width: 100%; 
          margin: 0 auto;"/>}
        </div>
        </div>

        <div className="w-full md:border-l border-l-black px-2 mt-8">
          <div className="m-1 mb-4 col-start-2  w-full ">
          <h3 className="text-xl font-bold text-center">
            Detalles del Juego:
          </h3>
          <ul className="w-full px-2 py-2 flex flex-col gap-1">
            <li className="flex justify-between"><span className="font-semibold ">Peso:</span><span>{juego.size}</span> </li>
            <li className="flex justify-between "><span className="font-semibold mr-2">Idiomas:</span> <div className="text-end flex gap-x-1">{juego.languages && juego.languages.map((idioma, index) => (
                <span key={index}>{idioma.lang_name}</span>
            ))}</div></li>
            <li className="flex justify-between"><span className="font-semibold mr-2">Fecha de lanzamiento:</span><span className="text-end">{fechaFormateada}</span> </li>
            <li className="flex justify-between flex-wrap"><span className="font-semibold mr-2">Categorias: </span><div className="text-end flex gap-x-1">{juego.categories && juego.categories.map((categoria, index) => (<span key={index}>{categoria.category_name}</span>))}</div></li>
            <li className="flex justify-between"><span className="font-semibold mr-2">Desarrollador:</span><span className="text-end">{juego.developer}</span></li>
          </ul>
        </div> 
        <div className=" w-full">
          <h3 className="text-xl font-bold text-center"> Requisitos </h3>
          <div className="w-full ">
            <div className="px-2 py-2 mb-4">
            <h4 className="font-bold text-lg">Minimos:</h4>
            <ul className=" w-full  py-2 flex flex-col gap-1">
              <li><span className="font-semibold">Sistema operativo:</span><span className="ml-2">{juego.requirements.minimos.SO}</span></li>
              <li><span className="font-semibold">Memoria RAM:</span><span className="ml-2">{juego.requirements.minimos.Memoria}</span></li>
              <li><span className="font-semibold">Procesador:</span><span className="ml-2">{juego.requirements.minimos.Procesador}</span></li>
              <li><span className="font-semibold">Graficos:</span><span className="ml-2">{juego.requirements.minimos.Graficos}</span></li>
              <li><span className="font-semibold">Almacenamiento:</span><span className="ml-2">{juego.requirements.minimos.Almacenamiento}</span></li>
            </ul>
            </div>
            <div className="px-2 py-2 ">
            <h4 className="font-bold text-lg">Recomendados:</h4>
            <ul className=" w-full  py-2 flex flex-col gap-1">
              <li><span className="font-semibold">Sistema operativo:</span><span className="ml-2">{juego.requirements.recomendados.SO}</span></li>
              <li><span className="font-semibold">Memoria RAM:</span><span className="ml-2">{juego.requirements.recomendados.Memoria}</span></li>
              <li><span className="font-semibold">Procesador:</span><span className="ml-2">{juego.requirements.recomendados.Procesador}</span></li>
              <li><span className="font-semibold">Graficos:</span><span className="ml-2">{juego.requirements.recomendados.Graficos}</span></li>
              <li><span className="font-semibold">Almacenamiento:</span><span className="ml-2">{juego.requirements.recomendados.Almacenamiento}</span></li>
            </ul>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="mt-8 lg:my-4 flex flex-col  px-2 w-full lg:mx-auto lg:px-20 lg:py-8">
        <h2 className="text-3xl font-bold my-4 ">INSTRUCCIONES DE DESCARGA</h2>
        <div className="flex flex-col md:flex-row px-2 ">
        <ol className="w-full md:w-[75%] flex flex-col gap-3">
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

        <a href={juego.download_link}>
        <button className="py-2 px-3 tracking-wider mx-auto md:mx-0 mt-4 md:mt-0  bg-[#0735B3] self-center rounded-xl font-bold text-white flex items-center gap-1 text-lg shadow" > <HiDownload className="w-6 mr-1 h-6"/> DESCARGAR </button>
        </a>
        </div>
      </div>
      <div>
        <RelatedGames categorias={juego.categories}/>
      </div>
    </section>
        )}
    </div>
  )
}