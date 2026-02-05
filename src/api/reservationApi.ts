// src/api/reservationApi

import client from './client';
import { ModelDTO } from '../types/dto/ModelDTO';
import { CarDTO } from '../types/dto/CarDTO';
import { ParkingDTO } from '../types/dto/ParkingDTO';
import axios from 'axios';

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
    const { data } = await client.get<AvailableCarResponse[]>(`/reservation/cars`, {
      params: { parkingId, rentalDatetime, returnDatetime },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "차량 목록을 가져오는 데 실패했습니다.";
      throw new Error(message);
    }
    throw new Error("서버 연결이 원활하지 않습니다.");
  }
};