// pages/Reservation/components/MapView.tsx
import { useRef } from 'react';
import KakaoMap from '../../../../components/map/KaKaoMap.tsx';
import styles from './MapView.module.scss';
const MapView = ({ onMapLoad }: { onMapLoad: (map: any) => void }) => {
  const handleMapLoad = (map: any) => {
    onMapLoad(map);

    const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  };


  return (
    <div className={styles.map}>
      <KakaoMap onMapLoad={handleMapLoad} />
    </div>
  );
};

export default MapView;
