import React, { useState } from 'react';
import styles from './ParkingList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCar, faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ParkingDTO } from '../../../../../types/dto/ParkingDTO.ts';
import { ReservationInfo } from '../../../../../types/reservation.tsx';

interface ParkingListProps {
    filtered: ParkingDTO[];
    reservationInfo: ReservationInfo;
}

function ParkingList({ filtered, reservationInfo }: ParkingListProps) {
    const [isExpanded, setIsExpanded] = useState(true);

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


    const rentalDatetime = formatDateTimeForServer(reservationInfo.startDate);
    const returnDatetime = formatDateTimeForServer(reservationInfo.endDate);

    return (
        <div className={`${styles.parkingList} ${!isExpanded ? styles.collapsedContainer : ''}`}>
            <div className={styles.bar} onClick={() => setIsExpanded(!isExpanded)}>
                <span className={styles.barIcon}></span>
            </div>

            {filtered.length === 0 ? (
                <div className={styles.empty}>
                    <FontAwesomeIcon icon={faFaceFrown} />
                    <p>검색 결과가 없습니다.</p>
                </div>
            ) : (
                <ul className={!isExpanded ? styles.collapsed : ''}>
                    {filtered.map((parking) => (
                        <li key={parking.parking_id}>
                            {/* 클릭 시 주차장 ID와 예약 시간을 쿼리 스트링으로 전달 */}
                            <Link 
                                to={`/reservation/carList?parkingId=${parking.parking_id}&rentalDatetime=${rentalDatetime}&returnDatetime=${returnDatetime}`}
                                className={styles.linkWrapper}
                            >
                                <p className={styles.parkingName}>{parking.parking_name}</p>
                                
                                <div className={styles.information}>
                                    <div className={styles.info}>
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        {/* 구체적인 거리 계산 로직이 없다면 구/동 정보 표시 */}
                                        <p className={styles.parkingKm}>{parking.parking_district}</p>
                                    </div>
                                    <div className={styles.info}>
                                        <FontAwesomeIcon icon={faCar} />
                                        <p className={styles.parkingNum}>예약 가능 차량 보기</p>
                                    </div>
                                </div>

                                <div className={styles.addr}>
                                    <span>주소</span>
                                    <p className={styles.parkingAddr}>{parking.parking_address}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ParkingList;