import { Carousel } from "flowbite-react";
import React from 'react';

const SlideImageComponent = () => {
  return (
    <div className="my-[80px] md:mx-[100px] h-64 sm:h-64 xl:h-80 2xl:h-96 max-[436px]:w-[390px] max-[436px]:mx-auto overflow-hidden">
      <Carousel slideInterval={3000}>
        <img
          src="/image/image1/home-service-slide.jpg"
          alt="Slide 1"
          className="object-cover w-full h-full"
        />
        <img
          src="/image/image1/auto-service-slide.jpg"
          alt="Slide 2"
          className="object-cover w-full h-full"
        />
        <img
          src="/image/image1/restaurant-slide.jpg"
          alt="Slide 3"
          className="object-cover w-full h-full"
        />
        <img
          src="/image/image1/education-slide.jpg"
          alt="Slide 4"
          className="object-cover w-full h-full"
        />
        <img
          src="/image/image1/electronic-slide.png"
          alt="Slide 5"
          className="object-cover w-full h-full"
        />
      </Carousel>
    </div>
  );
};

export default SlideImageComponent;
