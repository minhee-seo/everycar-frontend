import { ModelDTO } from '../dto/ModelDTO';
import { CarDTO } from '../dto/CarDTO';
import { ParkingDTO } from '../dto/ParkingDTO';

//  주차장 정보
export type ParkingInfoResponse = Pick<ParkingDTO, 'parking_name' | 'parking_address'>;

// 모델 정보
export type ModelInfoResponse = ModelDTO;

export interface CarDetail extends Omit<CarDTO, 'parking'> {
  totalPrice: number;       // 계산된 총 금액
  model: ModelInfoResponse;  // 상세 모델 정보
  parking: ParkingInfoResponse; // 상세 주차장 정보
}
