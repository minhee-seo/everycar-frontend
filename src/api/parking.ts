import client from './client';
import { ParkingDTO } from '../types/dto/ParkingDTO'; 

export const fetchParkingData = async (region: string): Promise<ParkingDTO[]> => {
  try {
    const response = await client.get<ParkingDTO[]>(`/parking`, {
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