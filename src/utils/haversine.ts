// 하버사인 공식 - 위도경도를 기반으로 두 지점 사이의 거리 구하기
/**
 * @param lat1 첫 번째 지점의 위도 (Latitude)
 * @param lon1 첫 번째 지점의 경도 (Longitude)
 * @param lat2 두 번째 지점의 위도 (Latitude)
 * @param lon2 두 번째 지점의 경도 (Longitude)
 * @returns 두 지점 사이의 거리 (미터)
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // 지구의 반지름 (미터)
  const φ1 = lat1 * (Math.PI / 180); // φ를 라디안으로 변환
  const φ2 = lat2 * (Math.PI / 180);
  const Δφ = (lat2 - lat1) * (Math.PI / 180);
  const Δλ = (lon2 - lon1) * (Math.PI / 180);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // 미터 단위

  return distance;
};

/**
 * @param distanceInMeters 거리 (미터)
 * @returns 
 */
export const formatDistance = (distanceInMeters: number): string => {
  if (distanceInMeters >= 1000) {
    // 1km 이상이면 km 단위로 표시
    const km = (distanceInMeters / 1000).toFixed(1);
    return `${km}km`;
  }
  // 1km 미만이면 m 단위로 표시
  return `${Math.round(distanceInMeters)}m`;
};