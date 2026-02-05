
import ResponsiveSwitch from '../../components/responsive/ResponsiveSwitch';
import CarListDesktop from './CarListDesktop';
import CarListMobile from './CarListMobile';


function CarList() {

  return (
    <ResponsiveSwitch
      mobileComponent={<CarListMobile />}
      desktopComponent={<CarListDesktop />}
    />
  );
}

export default CarList