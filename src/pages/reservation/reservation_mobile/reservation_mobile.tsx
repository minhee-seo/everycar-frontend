import React, { useEffect, useState } from 'react';
import styles from './reservation_mobile.module.scss';
import MapView from './components/MapView.tsx';
import ReservationController from './components/reservationController.tsx';
import SearchTrigger from './components/SearchTrigger.tsx';
import ParkingList from './components/ParkingList.tsx';

function ReservationMobile() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [parkingData, setParkingData] = useState<any[]>([]);
    const [keyword, setKeyword] = useState('');
    const [map, setMap] = useState<any>(null);

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
    };

    const closeSheet = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsSheetOpen(false);
            setIsClosing(false);
        }, 300);
    };

    return (
        <div className={styles.container}>
            {!isSheetOpen && <SearchTrigger onClick={openSheet} />}

            <section className={styles.mapWrap}>
                <MapView onMapLoad={setMap} />
            </section>

            {isSheetOpen && (
                <div className={styles.bottomSheet} onClick={closeSheet}>
                    <div
                        className={`${styles.sheetContent} ${isClosing ? styles.slideDown : styles.slideUp}`}
                        onClick={(e) => e.stopPropagation()}>
                        <ReservationController 
                            map={map} 
                            closeSheet={closeSheet} 
                            keyword={keyword}
                            setKeyword={setKeyword}
                            filtered={filtered} />
                    </div>
                </div>
            )}
            <ParkingList 
                filtered={filtered}
            />
        </div>
    );
}

export default ReservationMobile;

