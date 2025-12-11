import React, { useEffect, useState } from 'react'
import styles from './ParkingList.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faLocationDot, faCar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserLocation } from '../../../../types/UserLocation.ts';
import { calculateDistance, formatDistance } from '../../../../utils/haversine.ts';


interface ParkingListProps {
    parking: {
        parking_id: number,
        parking_name: string,
        parking_address: string,
        parking_latitude: number,
        parking_longitude: number
    }
    map: any;
    userLocation: UserLocation | null;
}

const ParkingList: React.FC<ParkingListProps> = ({ parking, map, userLocation }) => {
    const [distanceString, setDistanceString] = useState<string>('위치 확인 중...');

    // ✨ 2. userLocation 또는 parking 위치가 업데이트될 때만 거리 계산
    useEffect(() => {
        if (userLocation) {
            // 하버사인 공식으로 거리 계산 (미터 단위)
            const distanceMeters = calculateDistance(
                userLocation.lat,
                userLocation.lon,
                parking.parking_latitude,
                parking.parking_longitude
            );

            // 포맷하여 상태 업데이트
            setDistanceString(formatDistance(distanceMeters));
        } else {
            // userLocation이 아직 null인 경우 (위치 획득 중이거나 거부된 경우)
            setDistanceString('위치 정보 없음');
        }
    }, [userLocation, parking.parking_latitude, parking.parking_longitude]);
    // userLocation이 부모에서 획득된 후 업데이트될 때만 거리 재계산

    const handleClick = () => {
        if (!map) return;

        const position = new window.kakao.maps.LatLng(
            parking.parking_latitude,
            parking.parking_longitude // parking_longtitude -> parking_longitude (타입 통일)
        );

        map.panTo(position); // 부드럽게 이동
        map.setLevel(3); // 필요 시 확대
    };

    return (
        <li className={styles.parkingItem} onClick={handleClick}>
            <p className={styles.parkingName}>{parking.parking_name}</p>
            <div className={styles.information}>
                <div className={styles.info}>
                    <FontAwesomeIcon icon={faLocationCrosshairs} />
                    <p className={styles.parkingKm}>현재 위치에서 {distanceString}</p>
                    {/* <FontAwesomeIcon icon={faCar} />
                    <p className={styles.parkingNum}>3대 이용 가능</p> */}
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p className={styles.parkingAddr}>{parking.parking_address}</p>
                </div>
            </div>
            <Link to='/reservation/carList'>
                <div className={styles.viewCarsButton} >
                    이용 가능 차량 보기
                </div>
            </Link>
        </li >
    );
};

export default ParkingList