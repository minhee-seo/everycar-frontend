import React from 'react'
import styles from './ReservationController.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faClock, faAngleRight, faLocationDot, faCar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface ReservationControllerProps {
  map: any;
  filtered: any[];
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onSearchComplete?: () => void;
}

function ReservationController({ map, filtered, keyword, setKeyword, onSearchComplete }: ReservationControllerProps) {

  const handleSearchClick = () => {
    if (onSearchComplete) {
      console.log("검색실행됨");
      onSearchComplete();
    }
  }

  const searchParking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!map) return;

    if (filtered.length > 0) {
      // LatLngBounds 지도 재설정 범위 정보 객체
      const bounds = new window.kakao.maps.LatLngBounds()

      filtered.forEach(parking => {
        // LatLng 지도 중심좌표
        const position = new window.kakao.maps.LatLng(
          parking.parking_latitude,
          parking.parking_longtitude
        );

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          map,
          position,
        });

        // 커스텀 오버레이 생성
        const iwContent = `
                        <div class="CustomOverlay">
                            <span>${parking.parking_name}</span>
                        </div>`;

        const iwfowindow = new window.kakao.maps.CustomOverlay({
          position: position,
          content: iwContent,
          yAnchor: 2.5
        })

        iwfowindow.setMap(map);
        bounds.extend(position);
      });
      // bounds 확장 (20% margin)
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const marginRatio = 0.2;

      const latSpan = ne.getLat() - sw.getLat();
      const lngSpan = ne.getLng() - sw.getLng();

      const newSw = new window.kakao.maps.LatLng(
        sw.getLat() - latSpan * marginRatio,
        sw.getLng() - lngSpan * marginRatio
      );
      const newNe = new window.kakao.maps.LatLng(
        ne.getLat() + latSpan * marginRatio,
        ne.getLng() + lngSpan * marginRatio
      );

      const expandedBounds = new window.kakao.maps.LatLngBounds(newSw, newNe);

      map.setBounds(expandedBounds);
    }
    handleSearchClick();
  }

  return (
    <form onSubmit={searchParking}>
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
          <input
            type="text"
            className={styles.searchInput}
            placeholder='지역을 검색하세요'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
    </form>
  )
}

export default ReservationController
