import React, { useEffect, useState } from 'react'
import styles from './reservation_desktop.module.scss';
import Content from '../../../components/common/reservationControl/Content.tsx';
import MapView from '../reservation_mobile/components/MapView.tsx';
import ReservationController from './ReservationController.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faClock, faAngleRight, faLocationDot, faCar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ParkingList from './ParkingList.tsx';
import SelectList from './SelectList.tsx';
import ReservationDatePicker from '../datepicker/ReservationDatePicker.tsx';


const Reservation = () => {
  const [parkingData, setParkingData] = useState<any[]>([]);
  const [map, setMap] = useState<any>(null);
  const [keyword, setKeyword] = useState('');
  const [searchDone, setSearchDone] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
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
            setIsDatePickerOpen={setIsDatePickerOpen}
            dateRange={dateRange}
          />
          <div className={styles.resultCont}>
            {
              searchDone ? (
                <div className={styles.selectParking}>
                  {
                    filtered.length === 0 ? (
                      <div className={styles.empty}>
                        <FontAwesomeIcon icon={faFaceFrown} />
                        <p>검색 결과가 없습니다.</p>
                      </div>
                    ) : (
                      <>
                        <h3>{keyword} 에브리카 대여소</h3>
                        <ul className={styles.collapsed}>
                          {
                            filtered.map((parking, index) => (
                              <ParkingList key={index} parking={parking} map={map} />
                            ))
                          }
                        </ul>
                      </>
                    )
                  }
                </div>
              ) : (
                <SelectList />
              )
            }
          </div>
        </div>
        {isDatePickerOpen && (
          <div className={styles.datePickerOverlay}>
            <ReservationDatePicker
              onClose={() => setIsDatePickerOpen(false)}
              onDateSelect={(range) => {
                setDateRange(range);
              }}
            />
          </div>
        )}
      </div>
      <MapView onMapLoad={setMap} />
    </>
  )
}


export default Reservation;
