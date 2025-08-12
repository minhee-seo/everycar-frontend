import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import styles from './ReservationController.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faAngleRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';

declare global {
    interface Window {
        kakao: any;
    }
}

function ReservationController({ map, closeSheet }: { map: any, closeSheet: () => void }) {
    const [keyword, setKeyword] = useState('');
    const [parkingData, setParkingData] = useState<any[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch('/data/parking.json')
            .then(res => res.json())
            .then(data => setParkingData(data));

        inputRef.current?.focus();
    }, []);

    const searchParking = (e: React.FormEvent) => {
        e.preventDefault();
        if (!map) return;

        const filtered = parkingData.filter(
            p =>
                p.parking_province.includes(keyword) ||
                p.parking_district.includes(keyword) ||
                p.parking_name.includes(keyword)
        );

        if (filtered.length > 0) {
            const bounds = new window.kakao.maps.LatLngBounds();

            filtered.forEach(parking => {
                const position = new window.kakao.maps.LatLng(
                    parking.parking_latitude,
                    parking.parking_longtitude
                );
                const marker = new window.kakao.maps.Marker({
                    map,
                    position,
                });
                bounds.extend(position);
            });

            map.setBounds(bounds);
        }

        // ✅ 검색 버튼 클릭 시에만 닫기
        closeSheet();
    };

    return (
        <form className={styles.searchWrap} onSubmit={searchParking}>
            <div className={styles.dateWrap}>
                <div className={styles.date}>
                    <FontAwesomeIcon icon={faClock} />
                    <div className={styles.rentalDate}>
                        <span className={styles.selectDate}>1.1(수)</span>
                        <span>10:00</span>
                    </div>
                    <FontAwesomeIcon icon={faAngleRight} />
                    <div className={styles.rentalDate}>
                        <span className={styles.selectDate}>1.2(목)</span>
                        <span>10:00</span>
                    </div>
                </div>
                <span className={styles.totalHoure}>24시간</span>
            </div>
            <div className={styles.rentalState}>
                <FontAwesomeIcon icon={faLocationDot} />
                <input
                    type="text"
                    className={styles.inputState}
                    placeholder="렌트 지역을 입력해주세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    ref={inputRef}
                />
            </div>
            <button type="submit" className={styles.searchBtn}>검색</button>
        </form>
    );
}


export default ReservationController;