import client from './client';

export const authService = {
    // 로그인 요청
    login: async (userId: string, userPassword: string) => {
        const response = await client.post('/login', { userId, userPassword });
        return response.data; // { accessToken, refreshToken }
    },

    // 로그아웃 요청
    logout: async (userId: string) => {
        return await client.post('/api/logout', { userId });
    },

    // 토큰 갱신
    refresh: async (refreshToken: string) => {
        const response = await client.post('/refresh', { refreshToken });
        return response.data; // { accessToken }
    }
};