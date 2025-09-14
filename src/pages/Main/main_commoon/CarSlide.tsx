import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import styles from './CarSlide.module.scss';

const cars = [
  { id: 1, name: '현대 아반떼', image: '/images/avante.jpg' },
  { id: 2, name: '기아 쏘렌토', image: '/images/sorento.jpg' },
  { id: 3, name: '현대 그랜저', image: '/images/grandeur.jpg' },
  { id: 4, name: '기아 K5', image: '/images/k5.jpg' },
  { id: 5, name: '제네시스 GV80', image: '/images/gv80.jpg' },
];

export default function CarSlider() {
  return (
    <div className={styles.carSlider}>
      <h2 className={styles.title}>인기 차량</h2>
      <Swiper
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={4}
        className={styles.slider}
        breakpoints={{
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id} className={styles.slide}>
            <img src={car.image} alt={car.name} className={styles.image} />
            <p className={styles.name}>{car.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
