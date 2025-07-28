import React from 'react'
import styled from './MainPage.module.scss';
import Content from './main_desktop/Content.tsx';
import Slide from './Slide.tsx';
import ShortCut from './ShortCut.tsx';
import CarSlider from './main_desktop/CarSlide.tsx';
import ResponsiveSwitch from '../../components/responsive/ResponsiveSwitch.tsx';
import Mainbanner from './main_mobile/Mainbanner.tsx';

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
    <div className={styled.container}>
      <Slide></Slide>
      <Content></Content>
      <ShortCut></ShortCut>
      <CarSlider></CarSlider>
    </div>
  );
}

function Mobile() {
  return (
    <div className={styled.container}>
      <Mainbanner></Mainbanner>
      <ShortCut></ShortCut>
      <CarSlider></CarSlider>
    </div>
  );
}
export default MainPage
