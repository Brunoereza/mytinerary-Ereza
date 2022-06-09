import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "../components/styles/style.css";


// import required modules
import { Autoplay, Grid, Navigation, Pagination } from "swiper";
import Data from "./data"

export default function Carrousel() {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        slidesPerGroup={2}
        slidesPerView={2}
        grid={{
          rows: 2,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {Data.map((Data)=>(
        <SwiperSlide key={Data.id}>
          <img className="img-carrousel" src={Data.image} alt={Data.name} />
          {/* <h3 className="card-title align-baseline text-sm tracking-tight font-thin md:font-bold text-gray-900 sm:text-base md:text-3x1">
          <span className=" block x1:inline">
            {Data.name} <br />
          </span>

          </h3> */}
        </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}