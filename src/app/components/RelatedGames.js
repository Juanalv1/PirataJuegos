"use client"
import React, { useEffect, useState } from 'react'
import Card from './Card'
import Slider from "react-slick";
import { useMediaQuery } from 'react-responsive';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const RelatedGames = ({categories}) => {
  console.log(categories)
  const [games, setGames] = useState([])
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const req = await fetch(`https://piratajuegos.com/api/posts?categories=${encodeURIComponent(categories)}`);
        const res = await req.json();
        if (res) {
          setGames(res.slice(0,6));
        } else {
          throw new Error('No se pudo obtener los juegos');
        }
      } catch (err) {
        console.error("Hubo un error", err);
      }
    };
    // Limpiar el estado de juegos antes de hacer las nuevas solicitudes
    setGames([]);
    fetchGames()
  }, [categories]);
  const isLargeDesktop = useMediaQuery({ query: '(min-width: 1400px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px) and (max-width: 1400px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 320px)' });

  let slidesToShow;
  if (isLargeDesktop) {
    slidesToShow = 5;
  } else if (isDesktop) {
    slidesToShow = 4;
  } else if (isTablet) {
    slidesToShow = 3;
  } else if (isMobile) {
    slidesToShow = 1;
  } else{
    slidesToShow = 1
  }
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1
  };
  return (
    <div className=' font-Quato px-4 mt-4 w-full border-t border-t-black'>
      <h2 className='text-xl font-bold'>Juegos que quiza te gusten</h2>
      <div className='px-4 pb-6'>
        <Slider {...settings}>
          {games.length > 0 && games.map((game, index) => (
          <Card key={index} titulo={game.post_title} categorias={game.categories} image={game.img_url} version={game.version}/>
          ))}
          {games.length == 0 && (
            <p>
              No hay juegos disponibles apra mostrar
            </p>
          )}
        </Slider>
      </div>
    </div>
  )
}

export default RelatedGames
