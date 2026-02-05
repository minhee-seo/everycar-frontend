// src/api/userApi
import { ReservationDetail } from '../types/mypage/ReservationDetail';
import { ReservationItem } from '../types/mypage/ReservationItem';
import { UserProfileResponse } from '../types/mypage/UserProfileResponse';
import client from './client';


// 정보 수정 시 보낼 타입
export interface UserUpdateRequest extends Partial<UserProfileResponse> { }

export const userApi = {
  // 프로필 정보 조회
  getUserProfile: (userId: number) =>
    client.get<UserProfileResponse>(`/mypage/${userId}`),

  // 프로필 정보 업데이트
  updateUserProfile: (data: UserUpdateRequest) =>
    client.put('/mypage/update', data),


  // 특정 유저의 예약 내역 조회
  getMyReservations: async (userNum: number): Promise<ReservationItem[]> => {
    const response = await client.get(`/mypage/reservation/${userNum}`);
    return response.data;
  },

  // 예약 상세 내역 조회 API
  getReservationDetail: async (reservationId: number): Promise<ReservationDetail> => {
    const response = await client.get(`/mypage/reservation/detail/${reservationId}`);
    return response.data;
  },
};

