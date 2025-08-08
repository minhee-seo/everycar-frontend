// components/map/KakaoMap.tsx
import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  onMapLoad?: (map: any) => void;
}

const KakaoMap = ({ onMapLoad }: KakaoMapProps) => {
  useEffect(() => {
    const mapScriptId = 'kakao-map-script';

    if (!document.getElementById(mapScriptId)) {
      const script = document.createElement('script');
      script.id = mapScriptId;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1fc1193a647e2229d02c81559ac53d9e&libraries=services&autoload=false`;
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          if (!container) return;

          const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780),
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);

          // 부모에 map 객체 전달
          if (onMapLoad) onMapLoad(map);
        });
      };

      document.head.appendChild(script);
    }
  }, [onMapLoad]);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
      }}
    />
  );
};

export default KakaoMap;
