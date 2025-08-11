import React, { useState } from 'react';
import styles from './reservation_mobile.module.scss';
import MapView from './components/MapView.tsx';
import ReservationController from './components/reservationController.tsx';
import SearchTrigger from './components/SearchTrigger.tsx';

function ReservationMobile() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [map, setMap] = useState<any>(null);

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
                        <ReservationController map={map} closeSheet={closeSheet} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReservationMobile;