import MobileAppBar from '../components/common/header/header_mobile/MobileAppBar.tsx'
import MobileTabBar from '../components/common/header/header_mobile/MobileGnb.tsx'
import { appBarConfigMap } from '../components/common/header/header_mobile/appBarConfig.tsx';

import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/common/Footer.tsx';

const MobileLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  const config = appBarConfigMap[path] ?? { show: true, title: '페이지' };


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
        <MobileTabBar />
      </div>
    </>
  );
};

export default MobileLayout;