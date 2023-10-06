"use client"
import Image from "next/image";
import { Carousel, IconButton } from "./Carousel";
 
export default function Carrusel({images}) {
  console.log(images)
  return (
    <div>
      <h1 className="text-4xl font-bold">Carrusel</h1>
    </div>
  );
}