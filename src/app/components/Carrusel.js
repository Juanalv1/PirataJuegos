"use client"
import { Carousel } from "flowbite-react";
import Image from "next/image";
 
export default function Carrusel({images}) {
  console.log(images)
  return (
    <Carousel className="relative w-full h-full">
      {images.map((image, index) => (
        <Image src={image} key={index} fill={true} objectFit="contain"/>
      ))}
  </Carousel>
  );
}