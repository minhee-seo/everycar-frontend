// pages/Reservation/components/MapView.tsx
import { useEffect, useState } from 'react';
import KakaoMap from '../../../../components/map/KaKaoMap.tsx';
import styles from './MapView.module.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapView = ({ onMapLoad }: { onMapLoad: (map: any) => void }) => {
  const [parkingData, setParkingData] = useState<any[]>([]);
  const [mapInstance, setMapInstance] = useState<any>(null);

  // 주차장 데이터 로드
  useEffect(() => {
    fetch('/data/parking.json')
      .then(res => res.json())
      .then(data => setParkingData(data));
  }, []);

  // 지도 로드 후 콜백
  const handleMapLoad = (map: any) => {
    setMapInstance(map);
    onMapLoad(map);
  };

  // 클러스터 및 마커 추가
  useEffect(() => {
    if (!mapInstance || parkingData.length === 0) return;

    const kakao = window.kakao;

    // 클러스터러 생성
    const clusterer = new kakao.maps.MarkerClusterer({
      map: mapInstance,
      averageCenter: true,
      minLevel: 10, // 클러스터 최소 레벨
    });

    // 마커 배열 생성
    const markers = parkingData.map((parking) => {
      return new kakao.maps.Marker({
        position: new kakao.maps.LatLng(parking.parking_latitude, parking.parking_longtitude),
      });
    });

    // 클러스터에 마커 추가
    clusterer.addMarkers(markers);
  }, [mapInstance, parkingData]);

  return (
    <div className={styles.map}>
      <KakaoMap onMapLoad={handleMapLoad} />
    </div>
  );
};

export default MapView;
