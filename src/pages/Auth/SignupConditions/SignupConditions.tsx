import style from "./SignConditions.module.scss";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 임포트
import SignupProgress from "../SignupProgress/SignupProgress.tsx";
import ResponsiveSwitch from "../../../components/responsive/ResponsiveSwitch.tsx";
import Mobile from './SignupConditionsMobile.tsx';
import Desktop from './SignupConditionsDesktop.tsx';
function SignConditions() {

  return (
    <>
      <ResponsiveSwitch
        mobileComponent={<Mobile/>}
        desktopComponent={<Desktop/>}
      />
    </>
  )
}

export default SignConditions;
