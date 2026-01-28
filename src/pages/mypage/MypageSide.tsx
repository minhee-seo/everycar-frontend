import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MypageSide.module.scss';

function MypageSide() {
  return (
    <aside className={styles.sideMenu}>
      <h2>마이페이지</h2>
      <ul>
        <li>
          <NavLink 
            to="/myPage/info" 
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            개인정보 관리
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/myPage/reservations" 
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            예약 내역
          </NavLink>
        </li>
        {/* <li>
          <NavLink 
            to="/myPage/payment" 
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            결제 수단 관리
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/myPage/cs" 
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            고객센터
          </NavLink>
        </li> */}
      </ul>
    </aside>
  );
}

export default MypageSide;