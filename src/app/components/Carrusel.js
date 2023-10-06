
import { Carousel, IconButton } from "./Carousel";
 
export default function Carrusel({images}) {
  console.log(images)
  return (
    <Carousel className="rounded w-[90%]  flex" >
      {/* {images.map((imagen, index) => (
        <img key={index} src={imagen} className="h-full w-full object-cover flex " alt={`imagen ${index}`}/>
      ))} */}
       <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 1"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}