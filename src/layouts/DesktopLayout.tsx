import ResponsiveSwitch from '../components/responsive/ResponsiveSwitch.tsx';
import Header from '../components/common/header/header_desktop/DesktopGnb.tsx';
import Footer from '../components/common/Footer.tsx';
import { Outlet, useLocation } from 'react-router-dom';

const DesktopLayout = () => {
  const location = useLocation();

  // Footer를 숨길 경로 목록
  const hideFooterPaths = ["/login", "/reservation"];

  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="layout-wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default DesktopLayout;
