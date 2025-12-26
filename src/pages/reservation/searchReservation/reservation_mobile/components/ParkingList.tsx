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

    // 날짜 포맷팅 (API 요청 규격에 맞게 변환: 예 2025-12-26T14:00)
    const formatDateTime = (date: Date | null, time: string | null) => {
        if (!date || !time) return '';
        const datePart = date.toISOString().split('T')[0];
        return `${datePart}T${time}`;
    };

    const rentalDatetime = formatDateTime(reservationInfo.startDate, reservationInfo.startTime);
    const returnDatetime = formatDateTime(reservationInfo.endDate, reservationInfo.endTime);

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