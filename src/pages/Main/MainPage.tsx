import React, { useState } from 'react'
import styles from './MainPage.module.scss';
import Content from '../../components/common/reservationControl/Content';
import Slide from './main_desktop/Slide';
import ShortCut from './main_desktop/ShortCut';
import CarSlider from './main_commoon/CarSlide';
import ResponsiveSwitch from '../../components/responsive/ResponsiveSwitch';
import Searchbar from './main_mobile/Searchbar';
import Footer from '../../components/common/Footer';
import MainMobile from './main_mobile/MainMobile';
import MainDesktop from './main_desktop/MainDesktop';
import { ReservationInfo } from '../../types/ReservationInfo';
function MainPage() {
  return (
    <ResponsiveSwitch
      mobileComponent={<MainMobile />}
      desktopComponent={<MainDesktop />}
    />
  )
}

export default MainPage
