import { faClock, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useState } from 'react';
import { fetchParkingData } from '../../../../api/parking';
import { ParkingDTO } from '../../../../types/dto/ParkingDTO';
import { ReservationInfo } from '../../../../types/reservation';
import FormatKoreanDate from '../../../../utils/dateUtils';
import styles from './ReservationController.module.scss';

interface ReservationControllerProps {
  map: any;
  initialKeyword?: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onSearchComplete: (data: ParkingDTO[]) => void; // 데이터 전달하도록 타입 변경
  reservationInfo: ReservationInfo;
  setIsDatePickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dateRange: [Date | null, Date | null];
}

function ReservationController({
  map,
  setKeyword,
  onSearchComplete,
  setIsDatePickerOpen,
  reservationInfo,
  initialKeyword = ''
}: ReservationControllerProps) {
  const [localKeyword, setLocalKeyword] = useState(initialKeyword);
  const monthsShown = useMemo(() => 2, []);

  useEffect(() => {
    setLocalKeyword(initialKeyword);
  }, [initialKeyword]);

  useEffect(() => {
    if (map) {
      map.panBy(-150, 0);
    }
  }, [map]);


  const handleSearchClick = (data: ParkingDTO[]) => { // 검색 결과를 받도록 수정
    if (onSearchComplete) {
      onSearchComplete(data); // 검색 결과 데이터 전달
    }
  }

  const searchParking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!map) return;

    setKeyword(localKeyword);
    const filtered = await fetchParkingData(localKeyword); // API 호출

    if (filtered.length > 0) {
      // LatLngBounds 지도 재설정 범위 정보 객체
      const bounds = new window.kakao.maps.LatLngBounds()

      filtered.forEach(parking => {
        // LatLng 지도 중심좌표
        const position = new window.kakao.maps.LatLng(
          parking.parking_latitude,
          parking.parking_longitude
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
    } else {
      // 검색 결과가 없을 경우
    }
    handleSearchClick(filtered);
  }

  // datepicker 열기
  const handleDatePicker = () => {
    setIsDatePickerOpen(true);
  }

  return (
    <>
      <form onSubmit={searchParking}>
        <div className={styles.searchCont}>
          <div className={styles.dateWrap}>
            <FontAwesomeIcon icon={faClock} />
            <input
              type="text"
              placeholder='날짜를 입력하세요'
              readOnly
              onClick={handleDatePicker}
              value={
                reservationInfo.startDate ?
                  `${reservationInfo.startDate ? FormatKoreanDate(reservationInfo.startDate) : ''} ~ ${reservationInfo.endDate ? FormatKoreanDate(reservationInfo.endDate) : ''}`
                  : ''
              }
            />
            {/* <span className={styles.totalHoure}>{reservationInfo.totalTime}</span> */}
          </div>
          <div className={styles.inputState}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder='지역을 검색하세요'
              value={localKeyword}
              onChange={(e) => setLocalKeyword(e.target.value)}
            />
          </div>
        </div>
        <button type='submit' className={styles.submit}></button>
      </form>

    </>
  )
}

export default ReservationController