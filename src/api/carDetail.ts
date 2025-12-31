import axios from 'axios';
import { CarDTO } from '../types/dto/CarDTO';
import client from './client.ts';
import { ModelDTO } from '../types/dto/ModelDTO.ts';
import { ParkingDTO } from '../types/dto/ParkingDTO.ts';



// 상세 페이지 응답 구조 인터페이스
export interface CarDetailResponse {
  // 1. car 바구니 안에 자동차 기본 정보가 있음
  car: {
    car_id: number;
    car_fuel: string;
    car_grade: string;
    car_options: string;
    car_year: number;
    car_category: string | null; // 디버깅 결과 null인 것들
    car_status: number | null;
    model_id: string | null;
    rental_station: number;
    model: ModelDTO;
    totalPrice: number;
    parking: ParkingDTO;
    parkingList: ParkingDTO[] | null;
  };
}
export const getCarDetail = async (
  carId: string,
  rentalDatetime: string,
  returnDatetime: string
): Promise<CarDetailResponse> => {

  // 공백(' ')을 'T'로 치환 (예: 2025-12-26 19:30:27 -> 2025-12-26T19:30:27)
  const formattedRental = rentalDatetime.replace(' ', 'T');
  const formattedReturn = returnDatetime.replace(' ', 'T');

  const response = await client.get<CarDetailResponse>(`/reservation/cars/${carId}`, {
    params: {
      rental_datetime: formattedRental,
      return_datetime: formattedReturn,
    },
  });
  return response.data;
};