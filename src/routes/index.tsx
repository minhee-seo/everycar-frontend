import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/Main/MainPage.tsx';
import Header from '../components/common/Gnb.tsx';
import Footer from '../components/common/Footer.tsx';

import '../styles/global.scss';

const AppRoutes = () => (
<>
  <BrowserRouter>
  <Header></Header>
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  <Footer></Footer>
  </BrowserRouter>
</>
);

export default AppRoutes;
