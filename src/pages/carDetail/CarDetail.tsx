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
            <section className={styles.ContentSection_article}>
                <div className={styles.rentalTime}>
                    <h2>대여기간</h2>
                    <p>01. 01(월) 10:00 ~ 01. 02(화) 10:00</p>
                </div>
            </section>
            <section className={styles.ContentSection_article}>
                <div className={styles.carImage}>

                </div>
                <div className={styles.carInfo}>
                    <div>
                        <h3>EV6</h3>
                        <span>premium</span>
                    </div>
                    <div className={styles.car}>

                    </div>
                </div>
                <div className={styles.price}>

                </div>
            </section>
            <section className={styles.ContentSection_article}>
                <h2>대여 위치</h2>
                <div className={styles.location}>
                    <div className={styles.pickup}>
                        <h3>Pick Up & Drop Off</h3>
                        <p>서울특별시 강남구 서초동 어쩌구 저쩌구 강남역주차장</p>
                    </div>
                    <div className={styles.Houres}>
                        <h3>대여 기간</h3>
                        
                    </div>
                </div>
                <div className={styles.map}>

                </div>
            </section>
        </div>
    );
}

export default CarDetail