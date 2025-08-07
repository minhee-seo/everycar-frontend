// pages/Reservation/components/MapView.tsx
import { useRef } from 'react';
import KakaoMap from '../../../../components/map/KaKaoMap.tsx';
import styles from './MapView.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
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
      <div className={styles.map}>
        <KakaoMap onMapLoad={handleMapLoad} />
        {/* <div className={styles.btn}>
            <button style={styles.btnStyle}>
                <FontAwesomeIcon icon={faCrosshairs}></FontAwesomeIcon>
            </button>
        </div> */}
      </div>
  );
};

export default MapView;
