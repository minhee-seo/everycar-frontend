import { CarDTO } from "../types/dto/CarDTO";
import client from "./client.ts";

export const fetchAvailableCars = async (
  parkingId: number,
  rentalDatetime: string, // YYYY-MM-DD HH:mm:ss 형식의 문자열
  returnDatetime: string // YYYY-MM-DD HH:mm:ss 형식의 문자열
): Promise<CarDTO[]> => {
  try {
    const response = await client.get<CarDTO[]>(`/reservation/available-cars`, {
      params: {
        parkingId: parkingId,
        rentalDatetime: rentalDatetime,
        returnDatetime: returnDatetime,
      },
    });
    return response.data;
  } catch (error) {
    console.error('이용 가능 차량 데이터를 불러오는 중 오류 발생:', error);
    throw error; 
  }
};