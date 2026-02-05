// src/components/common/header/header_mobile/appBarConfig
import { faArrowLeft, faBars, faHome } from '@fortawesome/free-solid-svg-icons';

export interface AppBarConfig {
  pattern: RegExp | string;
  title?: string;
  show?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  customClass?: string;
}

export const appBarConfigMap: AppBarConfig[] = [
  { pattern: '/', show: false },

  {
    pattern: /^\/myPage\/reservations\/\d+$/,
    title: '상세조회',
    leftIcon: faArrowLeft,
    customClass: 'myPageAppBar',
  },

  {
    pattern: '/reservation',
    title: '예약하기',
    leftIcon: faArrowLeft,
    rightIcon: faBars,
    customClass: 'reservationAppBar',
  },
  {
    pattern: '/reservation/carList',
    title: '예약하기',
    leftIcon: faArrowLeft,
    rightIcon: faBars,
    customClass: 'reservationAppBar',
  },
  {
    pattern: '/reservation/payment',
    title: '결제',
    leftIcon: faArrowLeft,
  },
  {
    pattern: '/reservation/carDetail',
    title: '상세조회',
    leftIcon: faArrowLeft,
  },
  {
    pattern: '/reservation/contract',
    title: '결제',
    leftIcon: faArrowLeft,
  },
  {
    pattern: '/support/inquiry',
    title: '문의하기',
    leftIcon: faArrowLeft,
    rightIcon: null,
    customClass: 'inquiryAppBar',
  },
  {
    pattern: '/myPage/info',
    title: '내 정보',
    leftIcon: faArrowLeft,
    customClass: 'myPageAppBar',
  },
  {
    pattern: '/myPage/reservations',
    title: '예약내역',
    leftIcon: faArrowLeft,
    customClass: 'myPageAppBar',
  },
  {
    pattern: '/auth/login',
    title: '로그인',
    leftIcon: faArrowLeft,
    customClass: 'myPageAppBar',
  },
  {
    pattern: '/auth/SignConditions',
    title: '약관동의',
    leftIcon: faArrowLeft,
    customClass: 'myPageAppBar',
  },
  {
    pattern: '/login',
    title: '로그인',
    leftIcon: faArrowLeft,
    customClass: 'myPageAppBar',
  },  
  {
    pattern: '/auth/signup',
    title: '회원가입',
    leftIcon: faArrowLeft,
    customClass: 'myPageAppBar',
  },
  {
    pattern: '/estimate',
    title: '견적확인',
    leftIcon: faArrowLeft,
  },
];