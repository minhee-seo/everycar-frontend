import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../pages/Main/MainPage.tsx';
import Reservation from '../pages/reservation/searchReservation/reservation.tsx';
import Header from '../components/common/Gnb.tsx';
import Footer from '../components/common/Footer.tsx';

import ResponsiveLayout from '../layouts/ResponsiveLayout.tsx';

import '../styles/global.scss';
import '../layouts/layout.scss';
import CarList from '../pages/carList/CarList.tsx';
import CarDetail from '../pages/carDetail/CarDetail.tsx';
import Payment from '../pages/payment/Payment.tsx';
import Contract from '../pages/contract/Contract.tsx';
import Login from '../pages/login/Login.tsx';
import SignConditions from '../pages/Auth/SignupConditions/SignupConditions.tsx';
import Signup from '../pages/Auth/Signup.tsx';
import ProtectedRoute from '../components/auth/ProtectedRoute.tsx';
import MypageInfo from '../pages/mypage/MypageInfo.tsx';
import ReservationList from '../pages/mypage/ReservationList.tsx';
import MypageReservationDetail from '../pages/mypage/MypageReservationDetail.tsx';

const AppRoutes = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<ResponsiveLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="/reservation/carList" element={<CarList />} />
          <Route path="/reservation/carDetail" element={<CarDetail />} />
          <Route path="/reservation/contract" element={<Contract />} />
          <Route path="/reservation/payment" element={<Payment />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/SignConditions" element={<SignConditions />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/mypage">
            <Route path="info" element={<MypageInfo />} />
            <Route path="reservations" element={<ReservationList />} />
            <Route path="reservations/:id" element={<MypageReservationDetail />} />
          </Route>
          <Route path="/reservation/contract" element={<Contract />} />
          {/* 추가로 보호할 페이지들... */}
        </Route>
      </Routes>

    </BrowserRouter>
  </>
);

export default AppRoutes;


// 편도 요금 무료 계산
// 요일별 최저가 요금. 최저가와 관련된 로직 구현 더 생각해보면 좋을듯