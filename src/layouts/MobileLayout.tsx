import MobileAppBar from '../components/common/header/header_mobile/MobileAppBar.tsx'
import MobileTabBar from '../components/common/header/header_mobile/MobileGnb.tsx'
import { appBarConfigMap } from '../components/common/header/header_mobile/appBarConfig.tsx';

import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/common/Footer.tsx';

const MobileLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  const config = appBarConfigMap[path] ?? { show: true, title: '페이지' };

  // 경로별 title 매핑
  const appBarTitleMap: Record<string, string | null> = {
    '/': null, // 메인에서는 숨김
    '/reservation': '예약하기',
    '/support/event': '이벤트',
    '/support/inquiry': '문의하기',
    '/support/announcement': '공지사항',
    '/myPage/info': '내 정보',
    '/auth/login': '로그인',
    // 필요 시 더 추가
  };

  const title = appBarTitleMap[location.pathname] ?? '페이지';

  return (
    <>
      <div className="layout-wrapper">
        {config.show !== false && (
          <MobileAppBar
            title={config.title}
            leftIcon={config.leftIcon}
            rightIcon={config.rightIcon}
            customClass={config.customClass}
          />
        )}
                <Outlet />
        <Footer />
        <MobileTabBar />
      </div>
    </>
  );
};

export default MobileLayout;