import React from 'react'
import styles from './CarDetail.module.scss';

function CarOption() {

  return (
    <div className={`${styles.carOptionContainer} ${styles.detailWrap}`}>
      <h2>차량 옵션</h2>
      <div className={styles.carOptionBox}>
        <div className={styles.carOption}>
          <img
            alt={""}
          />
          <p>item</p>
        </div>
      </div>
    </div>
  );
}

export default CarOption
