import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Gnb.module.scss';

const Gnb: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('accessToken'));

  useEffect(() => {
    const checkToken = () => {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    };

    window.addEventListener('loginStateChange', checkToken);
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('loginStateChange', checkToken);
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('loginStateChange'));
  };

  return (
    <div className={styles.header}>
      <nav className={styles.menu}>
        <div className={styles.menuContainer}>
          <div className={styles.leftCenterGroup}>
            <div className={styles.leftMenu}>
              <Link to="/">
                <img src="/logo.png" alt="Logo" width={138} height={50} />
              </Link>
            </div>

            <div className={styles.centerMenu}>
              <ul>
                <li><Link to="/reservation/quickReservation">렌터카예약하기</Link></li>
                <li><Link to="/support/event">이벤트</Link></li>
                <li><Link to="/support/inquiry">문의하기</Link></li>
                <li><Link to="/support/announcement">공지사항</Link></li>
              </ul>
            </div>
          </div>

          <div className={styles.rightMenu}>
            <ul>
              {isLoggedIn ? (
                <>
                  <li><Link to="/" onClick={handleLogout}>로그아웃</Link></li>
                  <li><Link to="/myPage/info">내 정보</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/auth/login">로그인</Link></li>
                  <li><Link to="/auth/registerConditions">회원가입</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Gnb;
