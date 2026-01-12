type ReservationStatus = '전체' | '이용예정' | '이용중' | '반납완료' | '취소됨';

export interface ReservationItem {
  reservationId: number;
  carName: string;
  brand: string;
  fuel: string;
  rentalDate: string;
  returnDate: string;
  parkingName: string;
  totalPrice: number;
  status: ReservationStatus;
  carImg: string;
}