import client from './client.ts';
import { ParkingData } from '../types/dto/ParkingDTO.ts'; // 위에서 정의한 타입 임포트

export const fetchParkingData = async (region: string): Promise<ParkingData[]> => {
  try {
    const response = await client.get<ParkingData[]>(`/parking`, {
      params: {
        region: region,
      },
    });
    return response.data;
  } catch (error) {
    console.error('주차장 데이터를 불러오는 중 오류 발생:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};