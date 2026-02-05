import React, { useEffect, useState } from 'react'
import styles from './ParkingList.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faLocationDot, faCar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { UserLocation } from '../../../../types/UserLocation';
import { calculateDistance, formatDistance } from '../../../../utils/haversine';
import { ParkingDTO } from '../../../../types/dto/ParkingDTO';
import { ModelDTO } from '../../../../types/dto/ModelDTO';
import { CarDTO } from '../../../../types/dto/CarDTO';

export type ParkingInfoResponse = ParkingDTO;
export type ModelInfoResponse = ModelDTO;
export type CarInfoResponse = CarDTO;

interface ParkingListProps {
    parking: ParkingInfoResponse;
    map: any;
    userLocation: UserLocation | null;
    rentalDatetime: string;
    returnDatetime: string;
}

const ParkingList: React.FC<ParkingListProps> = ({ parking, map, userLocation, rentalDatetime, returnDatetime }) => {
    const [distanceString, setDistanceString] = useState<string>('위치 확인 중...');
    const navigate = useNavigate();
    useEffect(() => {
        if (userLocation) {
            const distanceMeters = calculateDistance(
                userLocation.lat,
                userLocation.lon,
                parking.parking_latitude,
                parking.parking_longitude
            );

            setDistanceString(formatDistance(distanceMeters));
        } else {
            setDistanceString('위치 정보 없음');
        }
    }, [userLocation, parking.parking_latitude, parking.parking_longitude]);
    // userLocation이 부모에서 획득된 후 업데이트될 때만 거리 재계산

    const handleClick = () => {
        if (!map) return;

        const position = new window.kakao.maps.LatLng(
            parking.parking_latitude,
            parking.parking_longitude
        );

        map.panTo(position); // 부드럽게 이동
        map.setLevel(3); // 필요 시 확대
    };

    const handleViewCars = () => {
        if (!parking.parking_id || !rentalDatetime || !returnDatetime) {
            console.error('필수 파라미터(주차장 ID, 대여 시간)가 누락되었습니다.');
            alert('대여 기간을 먼저 선택해주세요.');
            return;
        }

        const queryParams = new URLSearchParams({
            parkingId: parking.parking_id.toString(),
            rentalDatetime: rentalDatetime,// 'YYYY-MM-DD HH:mm:ss'
            returnDatetime: returnDatetime,
        }).toString();

        navigate(`/reservation/carList?${queryParams}`);
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
            <div className={styles.viewCarsButton} onClick={handleViewCars} >
                이용 가능 차량 보기
            </div>
        </li >
    );
};

export default ParkingList