// api 공통설정 
// src/api/client

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response, 
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 에러 상태코드가 401(또는 403)이고, 재시도한 적이 없는 요청일 때
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다.');
        }

        const response = await axios.post(`${client.defaults.baseURL}/refresh`, {
          refreshToken: refreshToken,
        });

        const { accessToken } = response.data;

        // 새 토큰 저장
        localStorage.setItem('accessToken', accessToken);

        // 원래 요청의 헤더를 새 토큰으로 교체 후 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return client(originalRequest); // 실패했던 요청 재실행

      } catch (refreshError) {
        // 리프레시 실패 시(리프레시 토큰도 만료 등) 로그아웃 처리
        console.error('토큰 갱신 실패:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default client;