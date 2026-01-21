import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProtectedRoute = () => {
  // Redux에서 로그인 상태 가져오기 (userId나 토큰 등)
  const { userId } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (!userId) {
    // 로그인이 안 되어 있다면 로그인 페이지로 이동
    // state를 넘겨주면 로그인 성공 후 다시 원래 가려던 페이지로 보내줄 수 있습니다.
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 로그인 상태라면 자식 컴포넌트(Outlet) 렌더링
  return <Outlet />;
};