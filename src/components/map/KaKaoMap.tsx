// components/map/KakaoMap.tsx
// 지도 호출

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  onMapLoad?: (map: any) => void;
}

const KakaoMap = ({ onMapLoad }: KakaoMapProps) => {
  const onMapLoadRef = useRef(onMapLoad);

  useEffect(() => {
    onMapLoadRef.current = onMapLoad;
  }, [onMapLoad]);

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById('map');
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(35.95, 128.25),
        level: 12
      };
      const map = new window.kakao.maps.Map(container, options);
      if (onMapLoadRef.current) onMapLoadRef.current(map);
    };

    if (!window.kakao) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=appkey&autoload=false&libraries=clusterer`;
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(initMap);
      };

      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default KakaoMap;
