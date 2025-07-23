import React from 'react'
import styled from './MainPage.module.scss';
import Content from './Content.tsx';
import Slide from './Slide.tsx';
function MainPage() {
  return (
    <div className={styled.container}>
      <Slide></Slide>
      <Content></Content>
    </div>
  )
}

export default MainPage
