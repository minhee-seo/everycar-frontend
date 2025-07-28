import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileGnb from './mobile/MobileGnb.tsx';
import ResponsiveSwitch from '../responsive/ResponsiveSwitch.tsx';
import DesktopGnb from './desktop/DesktopGnb.tsx';

const Gnb: React.FC = () => {
  // const isMobile = useMediaQuery({ maxWidth: 768 });

  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('accessToken'));

  // useEffect(() => {
  //   const checkToken = () => {
  //     setIsLoggedIn(!!localStorage.getItem('accessToken'));
  //   };

  //   window.addEventListener('loginStateChange', checkToken);
  //   window.addEventListener('storage', checkToken);

  //   return () => {
  //     window.removeEventListener('loginStateChange', checkToken);
  //     window.removeEventListener('storage', checkToken);
  //   };
  // }, []);

  // const handleLogout = () => {
  //   localStorage.clear();
  //   setIsLoggedIn(false);
  //   window.dispatchEvent(new Event('loginStateChange'));
  // };

  return (
    <ResponsiveSwitch
      mobileComponent={<MobileGnb />}
      desktopComponent={<DesktopGnb />}
    />
  );

};

export default Gnb;
