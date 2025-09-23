import React, { useEffect, useRef, useState } from 'react';
import styles from './ReservationController.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faAngleRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ReservationDatePicker from '../../datepicker/ReservationDatePicker.tsx';

declare global {
    interface Window {
        kakao: any;
    }
}

interface ReservationControllerProps {
    map: any;
    closeSheet: () => void;
    keyword: string;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    filtered: any[];
    onSearchComplete?: () => void;
    isDatePickerOpen: boolean;
    setIsDatePickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReservationController({ map, closeSheet, keyword, setKeyword, filtered, onSearchComplete, isDatePickerOpen, setIsDatePickerOpen }: ReservationControllerProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    // const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSearchClick = () => {
        if (onSearchComplete) {
            console.log('검색실행됨');
            onSearchComplete();
        }
    };

    const searchParking = (e: React.FormEvent) => {
        e.preventDefault();
        if (!map) return;

        if (filtered.length > 0) {
            const bounds = new window.kakao.maps.LatLngBounds();

            filtered.forEach((parking) => {
                const position = new window.kakao.maps.LatLng(parking.parking_latitude, parking.parking_longtitude);

                const marker = new window.kakao.maps.Marker({
                    map,
                    position,
                });

                const iwContent = `
          <div class="CustomOverlay">
            <span>${parking.parking_name}</span>
          </div>`;

                const iwfowindow = new window.kakao.maps.CustomOverlay({
                    position: position,
                    content: iwContent,
                    yAnchor: 2.5,
                });

                iwfowindow.setMap(map);
                bounds.extend(position);
            });

            const sw = bounds.getSouthWest();
            const ne = bounds.getNorthEast();
            const marginRatio = 0.2;
            const latSpan = ne.getLat() - sw.getLat();
            const lngSpan = ne.getLng() - sw.getLng();

            const newSw = new window.kakao.maps.LatLng(sw.getLat() - latSpan * marginRatio, sw.getLng() - lngSpan * marginRatio);
            const newNe = new window.kakao.maps.LatLng(ne.getLat() + latSpan * marginRatio, ne.getLng() + lngSpan * marginRatio);

            const expandedBounds = new window.kakao.maps.LatLngBounds(newSw, newNe);

            map.setBounds(expandedBounds);
        }

        closeSheet();
        handleSearchClick();
    };

    const openDatePicker = () => {
        setIsDatePickerOpen(true);
    };

    // const closeDatePicker = () => {
    //     setIsDatePickerOpen(false);
    // };

    return (
        <>
            <form className={styles.searchWrap} onSubmit={searchParking}>
                <div className={styles.dateWrap}>
                    <div className={styles.date} onClick={openDatePicker}>
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
                <button type="submit" className={styles.searchBtn}>
                    검색
                </button>
            </form>
            {/* {isDatePickerOpen && (
        <div className={styles.datePickerOverlay}>
          <div className={styles.datePickerContainer}>
            <ReservationDatePicker />
            <button onClick={closeDatePicker} className={styles.closeButton}>
              선택 완료
            </button>
          </div>
        </div>
      )} */}
        </>
    );
}

export default ReservationController;
