import React, { useState } from 'react';
import styles from './reservation_mobile.module.scss';
import MapView from './components/MapView.tsx';
import ReservationController from './components/ReservationController.tsx';
import SearchTrigger from './components/SearchTrigger.tsx';

function ReservationMobile() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const openSheet = () => setIsSheetOpen(true);
    const closeSheet = () => setIsSheetOpen(false);

    return (
        <div className={styles.container}>
            {!isSheetOpen && <SearchTrigger onClick={openSheet} />}

            <section className={styles.mapWrap}>
                <MapView />
            </section>

            {isSheetOpen && (
                <div className={styles.bottomSheet} onClick={closeSheet}>
                    <div className={styles.sheetContent} onClick={(e) => e.stopPropagation()}>
                        <ReservationController />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReservationMobile;