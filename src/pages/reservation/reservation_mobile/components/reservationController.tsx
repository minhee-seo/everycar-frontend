import React from 'react'
import { useState } from 'react';
import styles from './ReservationController.module.scss';

declare global {
    interface Window {
        kakao: any;
    }
}

function ReservationController() {
    const [keyword, setKeyword] = useState('');
    const [places, setPlaces] = useState<any[]>([]);

    const searchPlaces = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(keyword);
        if (!keyword.trim()) {
            alert('검색어를 입력하세요!');
            return;
        }

        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data: any[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setPlaces(data);
            } else {
                alert('검색 결과가 없습니다.');
                setPlaces([]);
            }
        });
    };

    return (
        <>
            <form className={styles.searchWrap} onSubmit={searchPlaces}>
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
                        id='keyword' 
                        className={styles.inputState} 
                        placeholder='렌트 지역을 입력해주세요' 
                        value={keyword}
                        onChange={(e) =>  setKeyword(e.target.value)}/>
                </div>
                <button type="submit" className={styles.searchBtn}>조회하기</button>
            </form>

            {/* 검색 결과 목록 */}
            <ul className={styles.placeList}>
                {places.map((place, index) => (
                    <li key={index}>
                        <strong>{place.place_name}</strong>
                        <br />
                        {place.road_address_name || place.address_name}
                        <br />
                        {place.phone && <span>{place.phone}</span>}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ReservationController