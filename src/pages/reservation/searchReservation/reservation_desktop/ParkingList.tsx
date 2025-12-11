import React from 'react'
import styles from './ParkingList.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faLocationDot, faCar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface ParkingListProps {
    parking: {
        parking_id: number,
        parking_name: string,
        parking_address: string,
        parking_latitude: number,
        parking_longitude: number
    }
    map: any;
}

const ParkingList: React.FC<ParkingListProps> = ({ parking, map }) => {
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
                    <p className={styles.parkingKm}>현재 위치에서 300m</p>
                    <FontAwesomeIcon icon={faCar} />
                    <p className={styles.parkingNum}>3대 이용 가능</p>
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