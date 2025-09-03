// src/components/common/header/header_mobile/appBarConfig.ts
import { faArrowLeft, faBars, faHome } from '@fortawesome/free-solid-svg-icons';

export interface AppBarConfig {
  title?: string;
  show?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  customClass?: string;
}

export const appBarConfigMap: Record<string, AppBarConfig> = {
  '/': {
    show: false,
  },
  '/reservation': {
    title: '예약하기',
    leftIcon: faArrowLeft,
    rightIcon: faBars,
    customClass: 'reservationAppBar',
  },
  '/reservation/carList': {
    title: '예약하기',
    leftIcon: faArrowLeft,
    rightIcon: faBars,
    customClass: 'reservationAppBar',
  },
  '/support/inquiry': {
    title: '문의하기',
    leftIcon: faArrowLeft,
    rightIcon: null,
    customClass: 'inquiryAppBar',
  },
  '/myPage/info': {
    title: '내 정보',
    leftIcon: faHome,
    rightIcon: faBars,
    customClass: 'myPageAppBar',
  },
};
