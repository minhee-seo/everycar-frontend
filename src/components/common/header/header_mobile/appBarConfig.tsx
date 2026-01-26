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
  '/reservation/payment': {
    title: '결제',
    leftIcon: faArrowLeft,
  },
  '/reservation/carDetail': {
    title: '상세조회',
    leftIcon: faArrowLeft,
  },
  '/reservation/contract': {
    title: '결제',
    leftIcon: faArrowLeft,
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
  '/auth/login': {
    title: '로그인',
    leftIcon: faArrowLeft,
    customClass: 'myPageAppBar',
  },
  '/auth/SignConditions': {
    title: '약관동의',
    leftIcon: faArrowLeft,
    customClass: 'myPageAppBar',
  },
  '/login': {
    title: '로그인',
    leftIcon: faArrowLeft,
    customClass: 'myPageAppBar',
  },
  '/auth/signup': {
    title: '회원가입',
    leftIcon: faArrowLeft,
    customClass: 'myPageAppBar',
  },
};