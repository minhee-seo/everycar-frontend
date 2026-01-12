export interface ReservationDetail {
  reservationId: number;
  paymentId: string;
  carId: number;
  carName: string;
  brand: string;
  fuel: string;
  carImg: string;
  rentalDate: string;
  returnDate: string;
  parkingName: string;
  parkingAddress: string;
  totalPrice: number;
  status: '이용예정' | '이용중' | '반납완료' | '취소됨';
  createdAt: string;
  // 추가될 수 있는 필드
  payMethod?: string;
  insurancePlan?: string;
}