// 백엔드 API 응답 구조에 맞게 정의
export interface ParkingData {
  parking_id: number;
  parking_name: string;
  parking_address: string;
  parking_latitude: number;
  parking_longitude: number; // longtitude 대신 longitude로 수정 (API 응답 예시 기준)
  parking_province: string;
  parking_district: string;
}