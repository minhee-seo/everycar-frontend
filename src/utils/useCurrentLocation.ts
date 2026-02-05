// hooks/useCurrentLocation.ts
import { useEffect, useState } from 'react';
import { loadKakaoMap } from './LoadKaKaoMap';

declare global {
  interface Window {
    kakao: any;
  }
}

export const useCurrentLocation = () => {
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // ✅ 1. Kakao API 로드 보장
        const kakao = await loadKakaoMap();

        // ✅ 2. 브라우저 위치 정보 가져오기
        if (!navigator.geolocation) {
          setError('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // ✅ 3. Kakao Geocoder 사용
            const geocoder = new kakao.maps.services.Geocoder();
            const coord = new kakao.maps.LatLng(latitude, longitude);

            geocoder.coord2Address(
              coord.getLng(),
              coord.getLat(),
              (result: any, status: any) => {
                if (status === kakao.maps.services.Status.OK) {
                  const region =
                    result[0].address.region_1depth_name +
                    ' ' +
                    result[0].address.region_2depth_name;
                  setAddress(region);
                } else {
                  setError('주소 변환 실패: ' + status);
                }
              }
            );
          },
          (err) => setError('위치 정보를 가져오지 못했습니다: ' + err.message),
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } catch (e) {
        setError('Kakao API 로드 실패');
      }
    };

    fetchLocation();
  }, []);

  return { address, error };
};
