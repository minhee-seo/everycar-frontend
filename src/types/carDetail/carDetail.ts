import { ModelDTO } from '../dto/ModelDTO.ts';
import { CarDTO } from '../dto/CarDTO.ts';
import { ParkingDTO } from '../dto/ParkingDTO.ts';

//  주차장 정보 타입 (ParkingDTO에서 필요한 것만 추출)
export type ParkingInfoResponse = Pick<ParkingDTO, 'parking_name' | 'parking_address'>;

// 모델 정보 타입
export type ModelInfoResponse = ModelDTO;

// 컴포넌트에서 실제로 사용할 차량 상세 데이터 인터페이스
export interface CarDetail extends Omit<CarDTO, 'parking'> {
  totalPrice: number;       // 계산된 총 금액
  model: ModelInfoResponse;  // 상세 모델 정보
  parking: ParkingInfoResponse; // 상세 주차장 정보
}
