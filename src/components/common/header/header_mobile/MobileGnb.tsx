import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MobileGnb.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCar,
  faGift,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function MobileGnb() {
  const location = useLocation();

  return (
    <>
      <nav className={styles.mobileTabBar}>
        <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
          <FontAwesomeIcon icon={faHome as any} />
          <span>홈</span>
        </Link>
        <Link
          to="/reservation"
          className={location.pathname.startsWith('/reservation') ? styles.active : ''}>
          <FontAwesomeIcon icon={faCar} />
          <span>예약</span>
        </Link>
        {/* <Link to="/support/event" className={location.pathname.includes('event') ? styles.active : ''}>
          <FontAwesomeIcon icon={faGift} />
          <span>이벤트</span>
        </Link> */}
        <Link
          to="/myPage/info"
          className={location.pathname.startsWith('/myPage') ? styles.active : ''}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>마이페이지</span>
        </Link>
      </nav>
    </>
  );
}