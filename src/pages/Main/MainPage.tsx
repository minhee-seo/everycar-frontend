import React from 'react'
import styled from './MainPage.module.scss';

import Slide from './Slide.tsx';
function MainPage() {
  return (
    <div className={styled.container}>
      <Slide></Slide>
    </div>
  )
}

export default MainPage
