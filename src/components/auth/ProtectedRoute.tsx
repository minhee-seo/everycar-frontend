import React, { useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import toast from 'react-hot-toast';

const ProtectedRoute = () => {
  // 리덕스에서 로그인 상태 확인
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const location = useLocation();

  const isnotified = useRef(false);

  useEffect(() => {
    // 로그인이 안 되어 있고, 아직 알림을 보여주지 않았을 때만 실행
    if (!isAuthenticated && !isnotified.current) {
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        // 모바일: 토스트 메시지
        toast.error("로그인 후 진행이 가능합니다.", {
          id: "auth-error", // 중복 방지용 ID
          position: 'bottom-center',
        });
      } else {
        // PC: 브라우저 Alert
        alert("로그인 후 예약 진행이 가능합니다.");
      }

      isnotified.current = true;
    }

    return () => {
      if (isAuthenticated) isnotified.current = false;
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;