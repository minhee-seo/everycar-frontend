// src/api/payment.ts
import client from './client.ts';

export interface PaymentVerifyRequest {
  paymentId: string;
  totalPrice: number;
  carId: number;
  userNum: number;
  rentalDatetime: string;
  returnDatetime: string;
}

export const verifyPayment = async (data: PaymentVerifyRequest) => {
  const response = await client.post('/reservation/complete', data);
  return response.data;
};