// src/api/reservationService
import client from './client';

export interface ContractDetailsParams {
  carId: number;
  userNum: number;
  parkingId: number;
}

export const reservationService = {
  // 계약 페이지 정보 조회
  getContractDetails: async (params: ContractDetailsParams) => {
    const response = await client.get('/reservation/contract-details', { params });
    return response.data;
  },

};