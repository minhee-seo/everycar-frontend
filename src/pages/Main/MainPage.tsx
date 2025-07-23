import React from 'react'
import styled from './MainPage.module.scss';
import Content from './Content.tsx';
import Slide from './Slide.tsx';
import ShortCut from './ShortCut.tsx';

function MainPage() {
  return (
    <div className={styled.container}>
      <Slide></Slide>
      <Content></Content>
      <ShortCut></ShortCut>
    </div>
  )
}

export default MainPage
