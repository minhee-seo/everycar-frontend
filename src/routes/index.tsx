import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/Main/MainPage.tsx';
import Reservation from '../pages/reservation/reservation_desktop/reservation.tsx';
import Header from '../components/common/Gnb.tsx';
import Footer from '../components/common/Footer.tsx';

import '../styles/global.scss';

const AppRoutes = () => (
<>
  <BrowserRouter>
  <Header></Header>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="reservation" element={<Reservation />} />
    </Routes>
  <Footer></Footer>
  </BrowserRouter>
</>
);

export default AppRoutes;


// 편도 요금 무료 계산
// 요일별 최저가 요금. 최저가와 관련된 로직 구현 더 생각해보면 좋을듯