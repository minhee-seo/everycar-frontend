import React from 'react'
import styles from './ParkingList.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faClock, faAngleRight, faLocationDot, faCar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface ParkingListProps{
    parkingData: any[];
    keyword: string;
    map: any;
}

function ParkingList({ parkingData, keyword, map }: ParkingListProps) {
    return (
        <div className={styles.selectParking}>
            {
                parkingData.length === 0 ?
                    <div className={styles.empty}>
                        <FontAwesomeIcon icon={faFaceFrown} />
                        <p>검색 결과가 없습니다.</p>
                    </div> :
                    <>
                        <h3>{keyword} 에브리카 대여소</h3>
                        <ul className={styles.collapsed}>
                            {
                                parkingData.map((parking, index) => {
                                    const handleClick = () => {

                                        const position = new window.kakao.maps.LatLng(
                                            parking.parking_latitude,
                                            parking.parking_longtitude
                                        );

                                        map.setCenter(position);

                                    };

                                    return (
                                        <li key={`parking${parking.parking_id}`} onClick={handleClick}>
                                            <p className={styles.parkingName}>{parking.parking_name}</p>
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
                                    );
                                })
                            }
                        </ul>
                    </>
            }
        </div>

    )
}

export default ParkingList