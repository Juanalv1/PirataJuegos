"use client"
import React from 'react';
import Card from './Card'
import { useMediaQuery } from 'react-responsive';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SliderContainer = ({games}) => {
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
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <div className='px-4 pb-6'>
    <Slider {...settings}>
      {games && games.length > 0 && games.slice(0, 8).map((game, index) => (
      <Card key={index} titulo={game.post_title} categorias={game.categories} image={game.img_url} version={game.version}/>
      ))}
      {games && games.length == 0 && (
        <p>
          No hay juegos disponibles para mostrar
        </p>
      )}
    </Slider>
  </div>
  )
}

export default SliderContainer
