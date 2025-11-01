import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const CurrentLocation: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // ✅ Kakao 지도 서비스 사용
        const geocoder = new window.kakao.maps.services.Geocoder();
        const coord = new window.kakao.maps.LatLng(latitude, longitude);

        geocoder.coord2Address(
          coord.getLng(),
          coord.getLat(),
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const region =
                result[0].address.region_1depth_name + " " +
                result[0].address.region_2depth_name;
              setAddress(region);
            } else {
              setError("주소 변환 실패: " + status);
            }
          }
        );
      },
      (err) => {
        setError("위치 정보를 가져오지 못했습니다: " + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  if (error) return <p>❌ {error}</p>;
  if (!address) return <p>📍 위치를 불러오는 중...</p>;

  return <p>현재 위치: {address}</p>;
};

export default CurrentLocation;
