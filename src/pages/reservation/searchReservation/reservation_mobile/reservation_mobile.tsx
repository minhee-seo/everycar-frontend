import React, { useEffect, useState } from 'react';
import styles from './reservation_mobile.module.scss';
import MapView from './components/MapView.tsx';
import ReservationController from './components/reservationController.tsx';
import SearchTrigger from './components/SearchTrigger.tsx';
import ParkingList from './components/ParkingList.tsx';
import ReservationDatePicker from '../datepicker/ReservationDatePicker.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import { ReservationInfo } from '../../../../types/reservation.tsx';

function ReservationMobile() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [parkingData, setParkingData] = useState<any[]>([]);
    const [keyword, setKeyword] = useState('');
    const [map, setMap] = useState<any>(null);
    const [searchDone, setSearchDone] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    // const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

    //datepicker 파라미터 받기
    const [reservationInfo, setReservationInfo] = useState<ReservationInfo>({
        startDate: null,
        endDate: null,
        totalTime: null
    });


    // 주차장 데이터 로드
    useEffect(() => {
        fetch('/data/parking.json')
            .then(res => res.json())
            .then(data => setParkingData(data));
    }, []);

    const filtered = parkingData.filter(
        p =>
            p.parking_province.includes(keyword) ||
            p.parking_district.includes(keyword) ||
            p.parking_name.includes(keyword)
    );


    const openSheet = () => {
        setIsClosing(false);
        setIsSheetOpen(true);
        setSearchDone(false);
    };

    const closeSheet = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsSheetOpen(false);
            setIsClosing(false);
        }, 300);
    };

    // 검색 완료 핸들러
    const handleSearchComplete = () => {
        setSearchDone(true);
        closeSheet();

    }


    // datepicker 파라미터 전달받기 핸들러
    const handleDateSelect = (info: ReservationInfo) => {
        setReservationInfo(info);
    }

    return (
        <div className={styles.container}>
            {!isSheetOpen && <SearchTrigger onClick={openSheet} />}

            <section className={styles.mapWrap}>
                <MapView onMapLoad={setMap} />
            </section>

            {isSheetOpen && (
                <div className={styles.bottomSheet} onClick={closeSheet}>
                    <div
                        className={`${styles.sheetContent} ${isClosing ? styles.exit : styles.entrance}`}
                        onClick={(e) => e.stopPropagation()}>
                        <ReservationController
                            map={map}
                            closeSheet={closeSheet}
                            keyword={keyword}
                            setKeyword={setKeyword}
                            filtered={filtered}
                            onSearchComplete={handleSearchComplete}
                            isDatePickerOpen={isDatePickerOpen}
                            setIsDatePickerOpen={setIsDatePickerOpen}
                            // dateRange={dateRange}
                            reservationInfo={reservationInfo}
                        />
                    </div>
                </div>
            )}

            {
                isDatePickerOpen && (
                    <div className={styles.datePickerOverlay} onClick={(e) => e.stopPropagation()}>
                       <div className={styles.delete}>
                        <FontAwesomeIcon icon={faX} onClick={() => setIsDatePickerOpen(false)} />
                       </div>
                        <ReservationDatePicker
                            onClose={() => setIsDatePickerOpen(false)}
                            onDateSelect={(range) => {
                                handleDateSelect(range);
                            }}
                        />
                    </div>
                )
            }
            {
                searchDone &&
                <ParkingList
                    filtered={filtered}
                />
            }
        </div >
    );
}

export default ReservationMobile;

