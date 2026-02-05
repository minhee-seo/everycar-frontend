import React, { useEffect, useState } from 'react';
import styles from './reservation_mobile.module.scss';
import MapView from './components/MapView';
import ReservationController from './components/reservationController';
import SearchTrigger from './components/SearchTrigger';
import ParkingList from './components/ParkingList';
import ReservationDatePicker from '../datepicker/ReservationDatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import { ReservationInfo } from '../../../../types/reservation';
import { getFourHoursLaterRounded, getSixHoursAfterFourHoursLater } from '../../../../utils/CurrentTime';
import { getRoundedDate } from '../../../../utils/getRoundedTime';
import { ParkingDTO } from '../../../../types/dto/ParkingDTO';

function ReservationMobile() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    // any[] 대신 정확한 타입을 할당합니다.
    const [parkingData, setParkingData] = useState<ParkingDTO[]>([]);
    const [keyword, setKeyword] = useState('');
    const [map, setMap] = useState<any>(null);
    const [searchDone, setSearchDone] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const start = getFourHoursLaterRounded();
    const end = getSixHoursAfterFourHoursLater();

    const [reservationInfo, setReservationInfo] = useState<ReservationInfo>({
        startDate: start,
        endDate: end,
        totalTime: null,
    });

    // 핵심 변경: 더미 로드 제거
    // 초기 렌더링 시에는 데이터가 없고, 검색 성공 시에만 데이터를 세팅합니다.
    const filtered = parkingData;

    const openSheet = () => {
        setIsClosing(false);
        setIsSheetOpen(true);
        setSearchDone(false);
    };

    const closeSheet = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsSheetOpen(false);
            setIsClosing(false);
        }, 300);
    };

    // 검색 완료 핸들러: Controller에서 fetchParkingData가 호출된 후 이쪽으로 데이터가 들어옵니다.
    const handleSearchComplete = (data: ParkingDTO[]) => {
        setParkingData(data);
        setSearchDone(true);
    };

    const handleDateSelect = (info: ReservationInfo) => {
        setReservationInfo(info);
    }

    return (
        <div className={styles.container}>
            {!isSheetOpen && <SearchTrigger onClick={openSheet} />}

            <section className={styles.mapWrap}>
                <MapView onMapLoad={setMap} />
            </section>

            {isSheetOpen && (
                <div className={styles.bottomSheet} onClick={closeSheet}>
                    <div
                        className={`${styles.sheetContent} ${isClosing ? styles.exit : styles.entrance}`}
                        onClick={(e) => e.stopPropagation()}>
                        <ReservationController
                            map={map}
                            closeSheet={closeSheet}
                            keyword={keyword}
                            setKeyword={setKeyword}
                            filtered={filtered} // 현재 상태 전달
                            onSearchComplete={handleSearchComplete} // 결과 콜백 전달
                            isDatePickerOpen={isDatePickerOpen}
                            setIsDatePickerOpen={setIsDatePickerOpen}
                            reservationInfo={reservationInfo}
                        />
                    </div>
                </div>
            )}

            {isDatePickerOpen && (
                <div className={styles.datePickerOverlay} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.delete}>
                        <FontAwesomeIcon icon={faX} onClick={() => setIsDatePickerOpen(false)} />
                    </div>
                    <ReservationDatePicker
                        reservationInfo={reservationInfo}
                        setReservationInfo={setReservationInfo}
                        onClose={() => setIsDatePickerOpen(false)}
                    />
                </div>
            )}

            {/* 검색이 완료되었을 때만 주차장 리스트 노출 */}
            {searchDone && (
                <ParkingList
                    filtered={filtered}
                    reservationInfo={reservationInfo} // 예약 날짜 정보를 함께 넘겨야 다음 페이지 이동 가능
                />
            )}
        </div>
    );
}

export default ReservationMobile;

