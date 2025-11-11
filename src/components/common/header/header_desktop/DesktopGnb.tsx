import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import styles from './DesktopGnb.module.scss';

const DesktopGnb: React.FC = () => {
  // 스크롤 상태 감지
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  // 로그인 상태 감지
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('accessToken'));

  const location = useLocation();
  const isMainPage = location.pathname === '/';


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 3) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    // cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div
      className={`
    ${styles.header} 
    ${!isMainPage ? styles.headerBlack : isScrolled ? styles.headerBlack : styles.headerWhite}
  `}
    >

      <nav className={styles.menu}>
        <div className={styles.menuContainer}>
          <div className={styles.leftCenterGroup}>
            <div className={styles.leftMenu}>
              <Link to="/">
                {!isMainPage ?
                  <img src="/logo.png" alt="Logo" width={138} height={50} />

                  : isScrolled ?
                    <img src="/logo.png" alt="Logo" width={138} height={50} />
                    :
                    <img src="/logo_white.png" alt="Logo" width={138} height={50} />
                }
              </Link>
            </div>

            <div className={styles.centerMenu}>
              <ul>
                <li><Link to="/reservation">렌터카예약하기</Link></li>
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
                  <li>
                    <div className={`btn btn--primary ${styles.signUp}`}>
                      <Link to="/auth/SignConditions">회원가입</Link>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default DesktopGnb;