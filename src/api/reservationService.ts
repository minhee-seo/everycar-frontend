// src/api/reservationService
import { ContractDetailsResponse } from '../types/contract/cantract';
import client from './client';

export interface ContractDetailsParams {
  carId: number;
  userNum: number;
  parkingId: number;
}

export const reservationService = {
  getContractDetails: async (params: ContractDetailsParams): Promise<ContractDetailsResponse> => {
    const response = await client.get('/reservation/contract-details', { params });
    return response.data;
  },
};