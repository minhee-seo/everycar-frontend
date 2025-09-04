import React from 'react'
import styles from './CarDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar, faCarSide, faUser } from '@fortawesome/free-solid-svg-icons';

function RentTime() {
    return (
        <div className={`${styles.rentTimeContainer} ${styles.detailWrap}`}>
            <h2>대여기간</h2>
            <div className={styles.rentTime}>
                <div className={styles.startRent}>
                    <span className={styles.startDate}>2025. 01.01 10:00</span>
                </div>
                <FontAwesomeIcon icon={faCarSide} />
                <div className={styles.endRent}>
                    <span className={styles.endDate}>01.01 10:00</span>
                </div>
            </div>
        </div>
    );
}

export default RentTime
