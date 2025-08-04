import React from 'react'
import styles from './reservation_desktop.module.scss';
import Content from '../../../components/common/reservationControl/Content.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
function reservation() {
  const recentSearches = ['강남지점', '역삼지점', '삼성지점', '용산지점', '부산지점']; // 예시 배열

  return (
    <>
      <div className={styles.banner}>      </div>
      <div className={styles.container}>
        <Content></Content>
        <div className={styles.cont}>
          <h3>최근 검색</h3>
          <div className={styles.resentSearch}>
            <Swiper
              slidesPerView={3}
              spaceBetween={10}
              modules={[Pagination]}
              className={styles.resentSlide}
              breakpoints={{
                1024: { slidesPerView: 4 },
                768: { slidesPerView: 2 },
                480: { slidesPerView: 1 },
              }}
            >
              {recentSearches.map((branch, index) => (
                <SwiperSlide key={index}>
                  <ResentSearch name={branch} />
                </SwiperSlide>
              ))}
            </Swiper>


          </div>
        </div>
        <div className={styles.cont}>
          <h3>이용 규칙</h3>
          <div className={styles.detail}></div>
        </div>
      </div>
    </>
  )
}

function ResentSearch({ name }) {
  return (
    <li>
      <div className={styles.searchList}>
        <div className={styles.region}>
          <p>{name}</p>
          <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
          <p>{name}</p>
        </div>
        <div className={styles.time}>
          <p>03.24(월) 10:00 ~ 03.25(화) 10:00 (24시간)</p>
        </div>
      </div>
    </li>
  );
}

export default reservation
