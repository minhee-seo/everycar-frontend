// src/api/userApi.ts
import { UserProfileResponse } from '../types/UserProfileRespons.ts';
import client from './client.ts';


// 정보 수정 시 보낼 타입
export interface UserUpdateRequest extends Partial<UserProfileResponse> {}

export const userApi = {
  // 프로필 정보 조회
  getUserProfile: (userId: number) => 
    client.get<UserProfileResponse>(`/mypage/${userId}`),

  // 프로필 정보 업데이트
  updateUserProfile: (data: UserUpdateRequest) => 
    client.put('/mypage/update', data),
};