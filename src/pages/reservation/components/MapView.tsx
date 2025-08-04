// pages/Reservation/components/MapView.tsx
import { useRef } from 'react';
import KakaoMap from '../../../components/map/KaKaoMap.tsx';

const MapView = () => {
  const mapRef = useRef<any>(null);

  const handleMapLoad = (map: any) => {
    mapRef.current = map;

    // 🔽 여기서 마커 등 추가 가능
    const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    // 예: 지도 중심 이동도 가능
    // map.setCenter(markerPosition);
  };

  return (
    <section style={{ width: '100%', height: '400px' }}>
      <h3>지점 위치</h3>
      <div style={{ width: '100%', height: '100%' }}>
        <KakaoMap onMapLoad={handleMapLoad} />
      </div>
    </section>
  );
};

export default MapView;
