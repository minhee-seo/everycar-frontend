import React, { useEffect, useMemo, useState } from 'react'
import styles from './ReservationController.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faAngleRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ko } from "date-fns/locale";
import DatePicker from 'react-datepicker';
import ReservationDatePicker from '../datepicker/ReservationDatePicker.tsx';

import { ReservationInfo } from '../../../../types/reservation.tsx';
import FormatKoreanDate from '../../../../utils/dateUtils.ts';

interface ReservationControllerProps {
  map: any;
  parkingData: any[];
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onSearchComplete?: () => void;
  reservationInfo: ReservationInfo;
  setIsDatePickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dateRange: [Date | null, Date | null];
}

function ReservationController({ map, parkingData, setKeyword, onSearchComplete, setIsDatePickerOpen, dateRange, reservationInfo }: ReservationControllerProps) {
  const [localKeyword, setLocalKeyword] = useState('');
  const monthsShown = useMemo(() => 2, []);

//   console.log(`${reservationInfo.startDate
//       ? reservationInfo.startDate.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })
//       : ''
//     } ${reservationInfo.startTime || ''} ~${reservationInfo.endDate
//       ? reservationInfo.endDate.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })
//       : ''
//     } ${reservationInfo.endTime || ''}
// `);

  useEffect(() => {
    if (map) {
      map.panBy(-150, 0);
    }
  }, [map]);


  const handleSearchClick = () => {
    if (onSearchComplete) {
      console.log("검색실행됨");
      onSearchComplete();
    }
  }

  const searchParking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!map) return;

    setKeyword(localKeyword);

    const filtered = parkingData.filter(
      p =>
        p.parking_province.includes(localKeyword) ||
        p.parking_district.includes(localKeyword) ||
        p.parking_name.includes(localKeyword)
    );

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

  // datepicker 열기
  const handleDatePicker = () => {
    setIsDatePickerOpen(true);
  }

  // datepicker 결과값 리턴
  const [date, setDate] = useState<ReservationInfo | null>(null)


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
                `${reservationInfo.startDate ? FormatKoreanDate(reservationInfo.startDate) : ''
                } ${reservationInfo.startTime || ''} ~ ${reservationInfo.endDate ? FormatKoreanDate(reservationInfo.endDate) : ''
                } ${reservationInfo.endTime || ''}`
              :undefined
              }
            />
            <span className={styles.totalHoure}>{reservationInfo.totalTime}시간</span>
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
      </form>

    </>
  )
}

export default ReservationController