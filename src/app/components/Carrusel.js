"use client"
import { Carousel, IconButton } from "@material-tailwind/react";
 
export default function Carrusel({images}) {
  console.log(images)
  return (
    <Carousel className="rounded w-[90%]  flex" >
      {images.map((imagen, index) => (
        <img key={index} src={imagen} className="h-full w-full object-cover flex " alt={`imagen ${index}`}/>
      ))}
    </Carousel>
  );
}