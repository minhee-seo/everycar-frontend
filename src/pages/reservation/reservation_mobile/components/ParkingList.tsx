import React from 'react'
import styles from './ParkingList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCar } from '@fortawesome/free-solid-svg-icons';
function ParkingList() {
    return (
        <div className={styles.parkingList}>
            <div className={styles.bar}>
                <span className={styles.barIcon}></span>
            </div>
            <ul>
                <li>
                    <p className={styles.parkingName}>강남구공영주차장</p>
                    <div className={styles.information}>
                        <div className={styles.info}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <p className={styles.parkingKm}>현재 위치에서 300m</p>
                        </div>
                        <div className={styles.info}>
                            <FontAwesomeIcon icon={faCar} />
                            <p className={styles.parkingNum}>3대 이용 가능</p>
                        </div>
                    </div>
                                        <div className={styles.addr}>
                        <span>주소</span>
                        <p className={styles.parkingAddr}>서울특별시 강남구 어쩌구 저쩌구</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default ParkingList