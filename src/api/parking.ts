import client from './client.ts';
import { ParkingData } from '../types/Parking'; // 위에서 정의한 타입 임포트

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
    // 실제 운영 환경에서는 에러 처리를 더 자세히 해야 합니다.
    return []; // 에러 발생 시 빈 배열 반환
  }
};