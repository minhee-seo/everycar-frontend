import style from "./SignConditions.module.scss";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 임포트
import SignupProgress from "../SignupProgress/SignupProgress";
import ResponsiveSwitch from "../../../components/responsive/ResponsiveSwitch";
import Mobile from './SignupConditionsMobile';
import Desktop from './SignupConditionsDesktop';
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
