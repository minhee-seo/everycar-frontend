import React, { useEffect, useState } from 'react'
import styles from './reservation_desktop.module.scss';
import Content from '../../../components/common/reservationControl/Content.tsx';
import MapView from '../reservation_mobile/components/MapView.tsx';
import ReservationController from './ReservationController.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faClock, faAngleRight, faLocationDot, faCar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ParkingList from './ParkingList.tsx';


function Reservation() {
  const [parkingData, setParkingData] = useState<any[]>([]);
  const [map, setMap] = useState<any>(null);
  const [keyword, setKeyword] = useState('');
  const [searchDone, setSearchDone] = useState(false);

  useEffect(() => {
    fetch('/data/parking.json')
      .then(res => res.json())
      .then(data => setParkingData(data))
  }, []);

  const filtered = parkingData.filter(
    p =>
      p.parking_id.toString().includes(keyword) ||
      p.parking_province.includes(keyword) ||
      p.parking_district.includes(keyword) ||
      p.parking_name.includes(keyword)
  );

  const handleSearchComplete = () => {
    setSearchDone(true);
  }


  return (
    <>
      <div className={styles.mapContainer}>
        <div className={styles.search}>
          <ReservationController
            map={map}
            parkingData={parkingData}
            setKeyword={setKeyword}
            onSearchComplete={handleSearchComplete}
          />

          <div className={styles.resultCont}>
            <div className={styles.selectParking}>
              {
                filtered.length === 0 ?
                  <div className={styles.empty}>
                    <FontAwesomeIcon icon={faFaceFrown} />
                    <p>검색 결과가 없습니다.</p>
                  </div> :
                  <>
                    <h3>{keyword} 에브리카 대여소</h3>
                    <ul className={styles.collapsed}>
                      {
                        filtered.map((parking, index) => {
                          return (
                            <ParkingList
                              key={index}
                              parking={parking}
                              map={map}
                            />
                          );
                        })

                      }
                    </ul>
                  </>
              }
            </div>

            {/* <div className={styles.selectArea}>
              <h3>어디에서 출발하시나요?</h3>
              <ul>
                <li>서울</li>
                <li>경기도</li>
                <li>인천광역시</li>
                <li>부산광역시</li>
                <li>제주도</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <MapView onMapLoad={setMap} />
    </>
  )
}


export default Reservation;
