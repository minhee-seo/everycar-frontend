import React, { useState } from 'react'
import styles from './ParkingList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCar, faFaceFrown } from '@fortawesome/free-solid-svg-icons';

function ParkingList({ filtered }: { filtered: any[] }) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className={styles.parkingList}>
            <div className={styles.bar} onClick={() => setIsExpanded(!isExpanded)}>
                <span className={styles.barIcon}></span>
            </div>

            {
                filtered.length === 0 ?
                    <div className={styles.empty}>
                        <FontAwesomeIcon icon={faFaceFrown} />
                        <p>검색 결과가 없습니다.</p>
                    </div> :
                    <ul className={!isExpanded ? styles.collapsed : ''}>
                        {filtered.map((parking, index) => {
                            return (
                                <li key={index}>
                                    <p className={styles.parkingName}>{parking.parking_name}</p>
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
                            );
                        })}
                    </ul>

            }
        </div>
    )
}

export default ParkingList
