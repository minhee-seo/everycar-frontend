import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MobileGnb.module.scss';

const MobileGnb: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('accessToken'));



  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('loginStateChange'));
    toggleMenu(); // 메뉴 닫기
  };

  return (
    <div className={styles.mobileMenuContainer}>
      <div className={styles.center}>
        <Link to="/">
          <img src="/logo.png" alt="Logo" width={138} height={50} />
        </Link>
      </div>
      <button 
      className={`${styles.hamburgerIcon} ${isOpen ? styles.open : ''}`}
      onClick={toggleMenu} aria-label="메뉴 열기">
        <span />
        <span />
        <span />
      </button>

      <div className={`${styles.sidebar} ${isOpen ? styles.isOpen : ''}`}>
        <nav>
          <ul>
            <li><Link to="/reservation/quickReservation" onClick={toggleMenu}>렌터카 예약하기</Link></li>
            <li><Link to="/support/event" onClick={toggleMenu}>이벤트</Link></li>
            <li><Link to="/support/inquiry" onClick={toggleMenu}>문의하기</Link></li>
            <li><Link to="/support/announcement" onClick={toggleMenu}>공지사항</Link></li>
          </ul>
        </nav>

        <div className={styles.authButtons}>
          <ul>
            {isLoggedIn ? (
              <>
                <li><Link to="/" onClick={handleLogout}>로그아웃</Link></li>
                <li><Link to="/myPage/info" onClick={toggleMenu}>내 정보</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/auth/login" onClick={toggleMenu}>로그인</Link></li>
                <li><Link to="/auth/registerConditions" onClick={toggleMenu}>회원가입</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </div>
  );
};

export default MobileGnb;