// src/hooks/useLogout.ts
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../store/userSlice.ts'; // 경로 확인 필수
import { authService } from '../api/authService.ts';
import { RootState } from '../store';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      if (userId) {
        // 서버에 로그아웃 알림
        await authService.logout(userId);
      }
    } catch (error) {
      console.error("서버 로그아웃 처리 중 오류:", error);
      // 서버 에러가 나더라도 클라이언트는 로그아웃
    } finally {
      // 리덕스 상태 초기화 및 로컬스토리지 삭제
      dispatch(logoutAction());

      alert("로그아웃 되었습니다.");
      navigate('/login');
      window.location.href = '/';
    }
  };


  return { handleLogout };
};