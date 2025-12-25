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
import { ParkingData } from '../../../../types/dto/ParkingDTO.ts';
import { UserLocation } from '../../../../types/UserLocation.ts';

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
  const [parkingData, setParkingData] = useState<ParkingData[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [map, setMap] = useState<any>(null);
  const [keyword, setKeyword] = useState('');
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
      // startTime: getRoundedDate(
      //   start.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })
      // ).rentTime,
      // endTime: getRoundedDate(
      //   start.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })
      // ).returnTime,
      totalTime: null,
    }
  );

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
  }, []); // 빈 배열: 최초 마운트 시 한 번만 실행

  const filtered = parkingData;
  const handleSearchComplete = (data: ParkingData[]) => { // 검색 완료 시 데이터 받도록 수정
    setParkingData(data); // 검색 결과로 parkingData 업데이트
    setSearchDone(true);
  }

  // onDateSelect 받기
  const handleDateSelect = (info: ReservationInfo) => {
    setReservationInfo(info);
  }

  return (
    <>
      <div className={styles.mapContainer}>
        <div className={styles.search}>
          <ReservationController
            map={map}
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
                                // rentalDatetime={reservationInfo.startDate}
                                // returnDatetime={}
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
