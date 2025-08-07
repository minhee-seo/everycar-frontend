import React from 'react'
import styles from './reservation_mobile.module.scss';
import MapView from './components/MapView.tsx';
import Remocorn from './components/reservationController.tsx'
function reservation_mobile() {
    return (
        <div className={styles.container}>
            <section className={styles.searchArea}>
                <Remocorn />
            </section>
            <section className={styles.mapWrap}>
                <MapView />
            </section>
        </div>
    )
}

export default reservation_mobile