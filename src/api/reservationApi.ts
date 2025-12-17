// src/api/reservationApi.ts

import client from './client.ts'; 
import { ModelDTO } from '../types/dto/ModelDTO.ts';
import { CarDTO } from '../types/dto/CarDTO.ts';
import { ParkingDTO } from '../types/dto/ParkingDTO.ts';

export type ParkingInfoResponse = Pick<ParkingDTO, 'parking_name' | 'parking_address'>;
export type ModelInfoResponse = ModelDTO;
export type CarInfoResponse = CarDTO;
export interface AvailableCarResponse {
  car: CarInfoResponse;
  model: ModelInfoResponse;
  parking: ParkingInfoResponse;

}

export const getAvailableCars = async (
  parkingId: string,
  rentalDatetime: string,
  returnDatetime: string
): Promise<AvailableCarResponse[]> => {
  try {
    const response = await client.get<AvailableCarResponse[]>(`/reservation/cars`, {
      params: {
        parkingId,
        rentalDatetime,
        returnDatetime,
      },
    });

    return response.data;

  } catch (error) {
    // 에러 로깅 또는 사용자 정의 에러 처리
    console.error("차량 목록 조회 API 호출 실패:", error);
    throw new Error("차량 목록을 불러오는 중 오류가 발생했습니다.");
  }
};
