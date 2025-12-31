import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.scss';
import client from '../../api/client.ts'; // axios 인스턴스

const Login = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 서버 APIUserController의 @PostMapping("/login") 호출
      const response = await client.post('/login', {
        userId,
        userPassword
      });

      if (response.data.accessToken) {
        // 토큰 저장 (Local Storage)
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        
        // 메인 페이지 또는 이전 페이지로 이동
        navigate('/');
      }
    } catch (err: any) {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
      console.error('Login Error:', err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <h2>로그인</h2>
          <p>Everycar와 함께 스마트한 이동을 시작하세요</p>
        </div>

        <form onSubmit={handleLogin}>
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

          <button type="submit" className={styles.loginBtn}>
            로그인
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