import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProtectedRoute = () => {
  // 리덕스에서 로그인 상태 확인
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (!isAuthenticated) {
    // 로그인이 안 되어 있으면 알림을 띄우고 로그인 페이지로 이동
    return <Navigate to="/login" replace />;
  }

  // 로그인 되어 있으면 자식 라우트(Outlet)를 보여줌
  return <Outlet />;
};

export default ProtectedRoute;