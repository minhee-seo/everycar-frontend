import ResponsiveSwitch from '../components/responsive/ResponsiveSwitch';

import MobileLayout from '../layouts/MobileLayout';
import DesktopLayout from '../layouts/DesktopLayout';


const ResponsiveLayout = () => (
  <ResponsiveSwitch
    mobileComponent={<MobileLayout />}
    desktopComponent={<DesktopLayout />}
  />
);


export default ResponsiveLayout;
