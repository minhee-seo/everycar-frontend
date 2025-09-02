import React from 'react'
import styles from './CarList.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faLocationDot, faCarSide, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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