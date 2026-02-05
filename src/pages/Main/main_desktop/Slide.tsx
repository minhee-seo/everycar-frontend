import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import './Slide.scss';

// import required modules
import { Navigation } from 'swiper/modules';

export default function Slide() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide><img src="/main/promotion/main-promotion1.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="/main/promotion/main-promotion2.png" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}
