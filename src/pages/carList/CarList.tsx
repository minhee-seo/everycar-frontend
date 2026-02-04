
import ResponsiveSwitch from '../../components/responsive/ResponsiveSwitch.tsx';
import CarListDesktop from './CarListDesktop.tsx';
import CarListMobile from './CarListMobile.tsx';


function CarList() {

  return (
    <ResponsiveSwitch
      mobileComponent={<CarListMobile />}
      desktopComponent={<CarListDesktop />}
    />
  );
}

export default CarList