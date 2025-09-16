import React from 'react'
import styles from './MainPage.module.scss';
import Content from '../../components/common/reservationControl/Content.tsx';
import Slide from './main_desktop/Slide.tsx';
import ShortCut from './main_commoon/ShortCut.tsx';
import CarSlider from './main_commoon/CarSlide.tsx';
import ResponsiveSwitch from '../../components/responsive/ResponsiveSwitch.tsx';
import Searchbar from './main_mobile/Searchbar.tsx';
import Footer from '../../components/common/Footer.tsx';
function MainPage() {
  return (
    <ResponsiveSwitch
      mobileComponent={<Mobile />}
      desktopComponent={<Desktop />}
    />
  )
}

function Desktop() {
  return (
    <div className={styles.container}>
      {/* <Slide></Slide> */}
      <Content></Content>
      <ShortCut></ShortCut>
      {/* <CarSlider></CarSlider> */}
      <Footer></Footer>
    </div>
  );
}

function Mobile() {
  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <Searchbar></Searchbar>
      </div>
      <div className={styles.mainCont}>
        <ShortCut></ShortCut>
        <CarSlider></CarSlider>
      </div>
    </div>
  );
}
export default MainPage
