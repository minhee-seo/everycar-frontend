import React, { useEffect, useRef, useState } from 'react';
import styles from './ReservationController.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faAngleRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ReservationDatePicker from '../../datepicker/ReservationDatePicker.tsx';
import { ReservationInfo } from '../../../../../types/reservation.tsx';
import FormatKoreanDate from '../../../../../utils/dateUtils.ts';

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
    // dateRange: [Date | null, Date | null];
    reservationInfo: ReservationInfo;
}

function ReservationController({ map, closeSheet, keyword, setKeyword, filtered, onSearchComplete, isDatePickerOpen, setIsDatePickerOpen, reservationInfo }: ReservationControllerProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    // const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

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

    const handleSearchClick = () => {
        if (onSearchComplete) {
            console.log('검색실행됨');
            onSearchComplete();
        }
    };


    const openDatePicker = () => {
        setIsDatePickerOpen(true);
    };

    return (
        <>
            <form className={styles.searchWrap} onSubmit={searchParking}>
                <div className={styles.dateWrap}>
                    <div className={styles.date} onClick={openDatePicker}>
                        <FontAwesomeIcon icon={faClock} />
                        <input
                            type="text"
                            className={styles.inputCont}
                            placeholder='이용 기간을 입력해주세요'
                            readOnly
                            value={
                                reservationInfo.startDate ?
                                    `${reservationInfo.startDate ? FormatKoreanDate(reservationInfo.startDate) : ''
                                    } ${reservationInfo.startTime || ''} ~ ${reservationInfo.endDate ? FormatKoreanDate(reservationInfo.endDate) : ''
                                    } ${reservationInfo.endTime || ''}`
                                    : ''
                            }
                        />
                    </div>
                    <span className={styles.totalHoure}>{reservationInfo.totalTime}</span>
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
        </>
    );
}

export default ReservationController;
