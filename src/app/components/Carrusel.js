"use client"
import { Carousel } from "flowbite-react";
 
export default function Carrusel({images, titulo}) {
  return (
    <Carousel className="w-full h-full">
      {images.map((image, index) => (
        <img src={image} key={index} alt={`Imagen ${titulo}  ${index}`} className="rounded flex object-cover "/>
      ))}
  </Carousel>
  );
}