import React from 'react'
import styles from './CarDetail.module.scss';
import { Link } from 'react-router-dom';

function ReservationInfo() {
  return (
    <div className={styles.container}>
      <div className={`${styles.reservationInfoContainer} ${styles.container}`}>
        <div className={styles.carImage}>
          <img />
        </div>

        <div className={styles.carContent}>
          <div className={styles.line} style={{ border: '1px solid #D9D9D9' }}></div>
          <div className={styles.carInfoBox}>
            <div className={styles.priceInfoBox}>
              <p>결제정보</p>
              <div className={styles.priceInfo}>
                <p style={{ marginLeft: '10px' }}>총대여료</p>
                <p style={{ fontWeight: '600' }}>
                  10,000 원
                </p>

              </div>
            </div>
            <div className={styles.buttonsContainer}>
              <button className={styles.counselButton}>
                상담신청
              </button>
              <Link to="/reservation/payment">
                <button className={styles.reservationButton}>
                  예약하기
                </button>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationInfo
