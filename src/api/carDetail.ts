import axios, { AxiosError } from 'axios';
import { CarDTO } from '../types/dto/CarDTO';
import client from './client.ts';
import { ModelDTO } from '../types/dto/ModelDTO.ts';
import { ParkingDTO } from '../types/dto/ParkingDTO.ts';

// 상세 페이지 응답 구조 인터페이스
export interface CarDetailResponse {
  car: {
    car_id: number;
    car_fuel: string;
    car_grade: string;
    car_options: string;
    car_year: number;
    car_category: string | null; 
    car_status: number | null;
    model_id: string | null;
    rental_station: number;
    model: ModelDTO;
    totalPrice: number;
    parking: ParkingDTO;
    parkingList: ParkingDTO[] | null;
    parking_latitude: number | null;
    parking_longitude: number | null;
  };
}

export const getCarDetail = async (
  carId: string,
  rentalDatetime: string,
  returnDatetime: string
): Promise<CarDetailResponse> => {
  try {
    const formattedRental = rentalDatetime.replace(' ', 'T');
    const formattedReturn = returnDatetime.replace(' ', 'T');

    const response = await client.get<CarDetailResponse>(`/reservation/cars/${carId}`, {
      params: {
        rental_datetime: formattedRental,
        return_datetime: formattedReturn,
      },
    });
    return response.data;
  } catch (error) {
    // Axios 에러 확인
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      
      // 404, 500 네트워크 에러
      if (axiosError.response) {
        console.error(`Status: ${axiosError.response.status}, Data:`, axiosError.response.data);
        throw new Error(axiosError.response.data?.message || '서버 응답 오류가 발생했습니다.');
      } 
      // 백엔드 응답 에러
      else if (axiosError.request) {
        throw new Error('서버와 통신할 수 없습니다. 네트워크 상태를 확인하세요.');
      }
    }
    // 기타에러
    throw new Error('요청 중 예상치 못한 오류가 발생했습니다.');
  }
};