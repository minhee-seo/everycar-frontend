// pages/Reservation/components/MapView
import { useEffect, useState } from 'react';
import { loadKakaoMap } from '../../../../../utils/LoadKaKaoMap';
import styles from './MapView.module.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapViewProps {
  onMapLoad?: (map: any) => void;
}


const MapView = ({ onMapLoad }: MapViewProps) => {
  const [parkingData, setParkingData] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const kakao = await loadKakaoMap();

        const container = document.getElementById('map');
        if (!container) return;

        const options = {
          center: new kakao.maps.LatLng(35.95, 128.25),
          level: 12,
        };

        const map = new kakao.maps.Map(container, options);

        if (onMapLoad) onMapLoad(map);
      } catch (error) {
        console.error('지도 로드 실패:', error);
      }
    };

    init();
  }, [onMapLoad]);

  return <div id="map" className={styles.map} />;
};


export default MapView;
