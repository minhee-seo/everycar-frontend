import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/Main/MainPage.tsx';
import Header from '../components/common/Gnb.tsx';
import '../styles/global.scss';

const AppRoutes = () => (
<>
  <BrowserRouter>
  <Header></Header>
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  </BrowserRouter>
</>
);

export default AppRoutes;
