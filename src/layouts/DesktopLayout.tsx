import ResponsiveSwitch from '../components/responsive/ResponsiveSwitch.tsx';
import Header from '../components/common/header/header_desktop/DesktopGnb.tsx';
import Footer from '../components/common/Footer.tsx';
import { Outlet } from 'react-router-dom';

const DesktopLayout = () => (
  <>
    <div className="layout-wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  </>
);

export default DesktopLayout;
