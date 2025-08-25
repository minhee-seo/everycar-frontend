import React, { useEffect, useState } from 'react'
import styles from './reservation_desktop.module.scss';
import Content from '../../../components/common/reservationControl/Content.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faClock, faAngleRight, faLocationDot, faCar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MapView from '../reservation_mobile/components/MapView.tsx';
function Reservation() {
  const [parkingData, setParkingData] = useState<any[]>([]);
  const [map, setMap] = useState<any>(null);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetch('/data/parking.json')
      .then(res => res.json())
      .then(data => setParkingData(data))
  }, []);

  const filtered = parkingData.filter(
    p =>
      p.parking_province.includes(keyword) ||
      p.parking_district.includes(keyword) ||
      p.parking_name.includes(keyword)
  );

  return (
    <>
      <div className={styles.mapContainer}>
        <div className={styles.search}>
          <div className={styles.searchCont}>
            <div className={styles.dateWrap}>
              <div className={styles.date}>
                <FontAwesomeIcon icon={faClock} />
                <div className={styles.rentalDate}>
                  <span className={styles.selectDate}>1.1(수)</span>
                  <span>10:00</span>
                </div>
                <FontAwesomeIcon icon={faAngleRight} />
                <div className={styles.rentalDate}>
                  <span className={styles.selectDate}>1.2(목)</span>
                  <span>10:00</span>
                </div>
              </div>
              <span className={styles.totalHoure}>24시간</span>
            </div>
            <div className={styles.inputState}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type="text" className={styles.searchInput} placeholder='지역을 검색하세요' />
            </div>
          </div>

          <div className={styles.resultCont}>
            <div className={styles.selectParking}>
              {/* <div className={styles.empty}>
                <FontAwesomeIcon icon={faFaceFrown} />
                <p>검색 결과가 없습니다.</p>
              </div> */}
              <h3>000 에브리카 대여소</h3>
              <ul className={styles.collapsed}>
                <li>
                  <p className={styles.parkingName}>강남역 주차장</p>
                  <div className={styles.information}>
                    <div className={styles.info}>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p className={styles.parkingKm}>현재 위치에서 300m</p>
                    </div>
                    <div className={styles.info}>
                      <FontAwesomeIcon icon={faCar} />
                      <p className={styles.parkingNum}>3대 이용 가능</p>
                    </div>
                  </div>
                  <div className={styles.addr}>
                    <p className={styles.parkingAddr}>서울특별시 강남구 어쩌구 저쩌구</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.selectArea}>
              <h3>어디에서 출발하시나요?</h3>
              <ul>
                <li>서울</li>
                <li>경기도</li>
                <li>인천광역시</li>
                <li>부산광역시</li>
                <li>제주도</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <MapView onMapLoad={setMap} />
    </>
  )
}


export default Reservation;
