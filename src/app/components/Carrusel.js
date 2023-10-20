"use client"
import { Carousel } from "flowbite-react";
import Image from "next/image";
 
export default function Carrusel({images}) {
  return (
    <Carousel className="w-full h-full">
      {images.map((image, index) => (
        <img src={image} key={index} alt={index} className="rounded flex object-cover "/>
      ))}
  </Carousel>
  );
}