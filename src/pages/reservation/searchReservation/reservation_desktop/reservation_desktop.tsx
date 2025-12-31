import React, { useEffect, useState } from 'react'
import styles from './reservation_desktop.module.scss';
import MapView from '../reservation_mobile/components/MapView.tsx';
import ReservationController from './ReservationController.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faClock, faAngleRight, faLocationDot, faCar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ParkingList from './ParkingList.tsx';
import SelectList from './SelectList.tsx';
import ReservationDatePicker from '../datepicker/ReservationDatePicker.tsx';
import { ReservationInfo } from '../../../../types/reservation.tsx';
import { getFourHoursLaterRounded, getSixHoursAfterFourHoursLater } from '../../../../utils/CurrentTime.ts';
import { getRoundedDate } from '../../../../utils/getRoundedTime.tsx';
import { useLocation } from 'react-router-dom';
import { ParkingDTO } from '../../../../types/dto/ParkingDTO.ts';
import { UserLocation } from '../../../../types/UserLocation.ts';
import { fetchParkingData } from '../../../../api/parking.ts';

interface DesktopProps {
  address?: string;
  reservationInfo?: ReservationInfo;
}


const Reservation = () => {
  // 메인페이지 -> 예약페이지로 넘어왔을때 지역 파라미터
  const location = useLocation();
  const state = location.state as { address?: string; reservationInfo?: ReservationInfo } | null;
  const address = state?.address || "";

  // 지도
  const [parkingData, setParkingData] = useState<ParkingDTO[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [map, setMap] = useState<any>(null);
  const [keyword, setKeyword] = useState(state?.address || '');
  const [searchDone, setSearchDone] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  // datepicker
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  // 기본 시간
  const start = getFourHoursLaterRounded();
  const end = getSixHoursAfterFourHoursLater();

  const [reservationInfo, setReservationInfo] = useState<ReservationInfo>(
    state?.reservationInfo || {
      startDate: start,
      endDate: end,
      totalTime: null,
    }
  );

  // 메인에서 address를 가지고 넘어왔을 때 자동 검색 실행
  useEffect(() => {
    if (state?.address && map) {
      const targetAddress = state.address; 

      const autoSearch = async () => {
        const filtered = await fetchParkingData(targetAddress); 
        setParkingData(filtered);
        setSearchDone(true);
        setKeyword(targetAddress);

        if (filtered.length > 0) {
          const bounds = new window.kakao.maps.LatLngBounds();
          filtered.forEach(parking => {
            const position = new window.kakao.maps.LatLng(parking.parking_latitude, parking.parking_longitude);
            new window.kakao.maps.Marker({ map, position });
            bounds.extend(position);
          });
          map.setBounds(bounds);
        }
      };
      autoSearch();
    }
  }, [map, state?.address]);

  useEffect(() => {
    // Geolocation API 호출은 컴포넌트 라이프사이클에서 한 번만 실행되도록 관리
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("사용자 위치 획득 실패:", error.message);
          // 위치 획득 실패 시 (예: 사용자가 거부), 서울 시청 등으로 기본값 설정 고려
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  const filtered = parkingData;
  const handleSearchComplete = (data: ParkingDTO[]) => { // 검색 완료 시 데이터 받도록 수정
    setParkingData(data); // 검색 결과로 parkingData 업데이트
    setSearchDone(true);
  }

  // onDateSelect 받기
  const handleDateSelect = (info: ReservationInfo) => {
    setReservationInfo(info);
  }

  const formatDateTimeForServer = (date: Date | null): string => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      // YYYY-MM-DD HH:mm:ss 포맷 반환
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    return "";
  };

  return (
    <>
      <div className={styles.mapContainer}>
        <div className={styles.search}>
          <ReservationController
            map={map}
            initialKeyword={state?.address || ''}
            setKeyword={setKeyword}
            onSearchComplete={handleSearchComplete}
            reservationInfo={reservationInfo}
            setIsDatePickerOpen={setIsDatePickerOpen}
            dateRange={dateRange}
          />
          <div className={styles.resultCont}>
            {
              searchDone ? (
                <div className={styles.selectParking}>
                  {
                    filtered.length === 0 ? (
                      <div className={styles.empty}>
                        <FontAwesomeIcon icon={faFaceFrown} />
                        <p>검색 결과가 없습니다.</p>
                      </div>
                    ) : (
                      <>
                        <h3>{keyword} 에브리카 대여소</h3>
                        <ul className={styles.collapsed}>
                          {
                            filtered.map((parking, index) => (
                              <ParkingList
                                key={index}
                                parking={parking}
                                map={map}
                                userLocation={userLocation}
                                rentalDatetime={formatDateTimeForServer(reservationInfo.startDate)}
                                returnDatetime={formatDateTimeForServer(reservationInfo.endDate)}
                              />
                            ))
                          }
                        </ul>
                      </>
                    )
                  }
                </div>
              ) : (
                <p className={styles.defaultContent}>
                  출발하실 지역을 검색하세요
                </p>
              )
            }
          </div>
        </div>
        {isDatePickerOpen && (
          <>
            <div className={styles.datePickerOverlay}>
              <ReservationDatePicker
                reservationInfo={reservationInfo}
                setReservationInfo={setReservationInfo}
                onClose={() => setIsDatePickerOpen(false)}
              />
            </div>
            <div className={styles.background}></div>
          </>
        )}
      </div>
      <MapView onMapLoad={setMap} />
    </>
  )
}


export default Reservation;