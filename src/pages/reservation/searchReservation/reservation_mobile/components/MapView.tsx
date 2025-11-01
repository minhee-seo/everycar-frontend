// pages/Reservation/components/MapView.tsx
import { useEffect, useState } from 'react';
import KakaoMap from '../../../../../components/map/KaKaoMap.tsx';
import styles from './MapView.module.scss';
import { loadKakaoMap } from '../../../../../utils/LoadKaKaoMap.tsx';

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

        // ✅ 여기서 부모에 map 객체 전달
        if (onMapLoad) onMapLoad(map);

        // 주차장 데이터 로드
        const res = await fetch('/data/parking.json');
        const data = await res.json();
        setParkingData(data);

        // 클러스터러 생성
        const clusterer = new kakao.maps.MarkerClusterer({
          map,
          averageCenter: true,
          minLevel: 10,
        });

        // 마커 생성 후 클러스터 추가
        const markers = data.map((parking: any) => {
          return new kakao.maps.Marker({
            position: new kakao.maps.LatLng(parking.parking_latitude, parking.parking_longtitude),
          });
        });

        clusterer.addMarkers(markers);
      } catch (error) {
        console.error('지도 로드 실패:', error);
      }
    };

    init();
  }, [onMapLoad]);

  return <div id="map" className={styles.map} />;
};


export default MapView;
