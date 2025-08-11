import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from './ReservationController.module.scss';

declare global {
    interface Window {
        kakao: any;
    }
}

function ReservationController({ map, closeSheet }: { map: any, closeSheet: () => void }) {
    const [keyword, setKeyword] = useState('');
    const [parkingData, setParkingData] = useState<any[]>([]);

    useEffect(() => {
        fetch('/data/parking.json')
            .then(res => res.json())
            .then(data => setParkingData(data));
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
            <div className={styles.date}>
                <div className={styles.rentalDate}>
                    <input type="text" /> 월
                    <input type="text" /> 일
                </div>
                <div className={styles.rentalDate}>
                    <input type="text" /> 월
                    <input type="text" /> 일
                </div>
            </div>
            <div className={styles.rentalState}>
                <input
                    type="text"
                    className={styles.inputState}
                    placeholder="렌트 지역을 입력해주세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <button type="submit" className={styles.searchBtn}>검색</button>
        </form>
    );
}


export default ReservationController;