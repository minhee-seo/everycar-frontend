import { ModelDTO } from '../dto/ModelDTO';
import { CarDTO } from '../dto/CarDTO';
import { ParkingDTO } from '../dto/ParkingDTO';

// 서버 응답 형태
export interface AvailableCarResponse {
  car: CarDTO;
  model: ModelDTO;
  parking: Pick<ParkingDTO, 'parking_name' | 'parking_address'>;
}

export interface CarDetail extends Omit<CarDTO, 'parking'> {
  model: ModelDTO;
  parking: Pick<ParkingDTO, 'parking_name' | 'parking_address'>;
  totalPrice: number;
}