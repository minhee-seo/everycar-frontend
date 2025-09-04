import React from 'react'
import styles from './CarDetail.module.scss';

function CarInfo() {
  let carInfo = [
    { title: '제조사', content: "EV6" },
    { title: '등급', content: "premium" },
    { title: '변속', content: "자동6단" },
    { title: '연료', content: "전기" },
    { title: '인원', content: `5명` },
    { title: '연식', content: "2025" },
  ];

  return (
    <div className={`${styles.carInfoContainer} ${styles.detailWrap}`}>
      <h2>차량 정보</h2>
      <div className={`${styles.carName}`}>
        <h5>EV6</h5>
        <span>premium</span>
      </div>

      <div className={`${styles.carInfo} ${styles.rentReservationStyle}`}>
        {
          carInfo.map((item, i) =>
            <div key={i} className={styles.carInfoItem}>
              <p className={styles.carInfoTitle} style={{ width: '40%' }}>{item.title}</p><p className={styles.carInfoContent} style={{ width: '60%' }}>{item.content}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default CarInfo
