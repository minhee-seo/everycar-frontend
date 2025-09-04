import React from 'react'
import styles from './CarDetail.module.scss';
import CarInfo from './CarInfo.tsx';
import RentTime from './RentTime.tsx';
import CarOption from './CarOption.tsx';
import RentLocation from './RentLocation.tsx';
import RentCondition from './RentCondition.tsx';
import ContractInfo from './ContractInfo.tsx';
import ReservationInfo from './ReservationInfo.tsx';

function CarDetail() {
    return (
        <div className={styles.container}>
            <div className={styles.mainTitle}>
                <h2>상세정보</h2>
            </div>

            <div className={styles.carDetailContainer}>
                <div className={styles.left}>
                    <RentTime/>
                    <CarInfo/>
                    <CarOption />
                    <RentLocation/>
                    <RentCondition/>
                    <ContractInfo/>
                </div>

                <div className={styles.right}>
                    <ReservationInfo/>
                </div>
            </div>
        </div>
    );
}

export default CarDetail