//  import React from "react";

//  import { Swiper, SwiperSlide } from "swiper/react";


//  import "swiper/css";
//  import "swiper/css/grid";
//  import "swiper/css/pagination";

//  import "../components/styles/style.css";



//  import { Autoplay, Grid, Navigation, Pagination } from "swiper";
// // import Data from "./data"

//  export default function Carrousel() {
//    return (
//      <>
//        <Swiper
//          autoplay={{
//            delay: 2500,
//            disableOnInteraction: false,
//          }}
//          navigation={true}
//          slidesPerGroup={2}
//          slidesPerView={2}
//          grid={{
//            rows: 2,
//          }}
//          spaceBetween={30}
//          pagination={{
//            clickable: true,
//          }}
//          modules={[Grid, Pagination, Navigation, Autoplay]}
//          className="mySwiper"
//        >
//          {Data.map((Data)=>(
//          <SwiperSlide key={Data.id} style={{backgroundImage:`url("${Data.image}")`, backgroundPosition:"center", backgroundSize:"cover"}}>
//          </SwiperSlide>
//          ))}
//        </Swiper>
//      </>
//    );
//  }





import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "../components/styles/style.css";



import { Autoplay, Grid, Navigation, Pagination } from "swiper";
import Data from "./data"
import {connect} from "react-redux"
import citiesActions from "../redux/actions/citiesActions";
import { useEffect } from "react";


export default function Carrousel() {

  // useEffect{()=>

  // }
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
        <SwiperSlide key={Data.id} style={{backgroundImage:`url("${Data.image}")`, backgroundPosition:"center", backgroundSize:"cover"}}>
        </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

// const mapDispatchToProps = {
//   getCities: citiesActions.getCities,
// }
//   const mapStateProps = (state) =>{
//     return{
//       cities: state.citiesReducer.cities,
//       auxiliar: state.citiesReducer.auxiliar
//     }
//   }

// export default connect {mapStateToProps, mapDispatchToProps}
