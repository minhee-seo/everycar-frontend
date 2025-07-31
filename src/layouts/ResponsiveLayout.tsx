import ResponsiveSwitch from '../components/responsive/ResponsiveSwitch.tsx';

import MobileLayout from '../layouts/MobileLayout.tsx';
import DesktopLayout from '../layouts/DesktopLayout.tsx';


const ResponsiveLayout = () => (
  <ResponsiveSwitch
    mobileComponent={<MobileLayout />}
    desktopComponent={<DesktopLayout />}
  />
);


export default ResponsiveLayout;
