import React from 'react'
import styles from './CarDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar, faGift, faUser } from '@fortawesome/free-solid-svg-icons';

function RentLocation() {
  return (
    <div className={`${styles.rentLocationContainer} ${styles.detailWrap}`}>
      <h2>대여 장소</h2>
      <div className={`${styles.rentPos} ${styles.greyTitle}`}>
        <p>대여장소</p>
        <p>강남구지하주차장</p>
      </div>
      <div className={`${styles.rentDetailPos} ${styles.greyTitle}`}>
        <p>상세주소</p>
        <p>서울특별시 강남구 서초동 어쩌구 저쩌구 강남구지하주차장</p>
      </div>
    </div>
  );
}

export default RentLocation
