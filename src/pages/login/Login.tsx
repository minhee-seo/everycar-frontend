import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/index.js';
import { loginUser } from '../../store/userSlice';
import styles from './Login.module.scss';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const { loading, error } = useSelector((state: RootState) => state.user);

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  const from = location.state?.from?.pathname || "/";


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비동기 액션 실행
    const resultAction = await dispatch(loginUser({ userId, userPassword }));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <h2>로그인</h2>
          <p>Everycar와 함께 스마트한 이동을 시작하세요</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="userId">아이디</label>
            <input
              id="userId"
              type="text"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="userPassword">비밀번호</label>
            <input
              id="userPassword"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: '#ff4d4f', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className={styles.footerLinks}>
          <Link to="/signup">회원가입</Link>
          <span>|</span>
          <Link to="/find-id">아이디/비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;