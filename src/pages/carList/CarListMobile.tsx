import React, { useEffect, useState } from 'react'
import styles from './CarListMobile.module.scss';
import './Slide.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faLocationDot, faCarSide, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link, useLocation } from 'react-router-dom';
import { getAvailableCars } from '../../api/reservationApi.ts';
import { CarDTO } from '../../types/dto/CarDTO';
import { ModelInfoResponse, ParkingInfoResponse } from './CarListDesktop';

interface CarDetail extends Omit<CarDTO, 'parking'> {
    totalPrice: number;
    model: ModelInfoResponse;
    parking: ParkingInfoResponse;
}

function CarListMobile() {
    const location = useLocation();
    const [carListData, setCarListData] = useState<CarDetail[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // URL 쿼리 파라미터 추출
    const queryParams = new URLSearchParams(location.search);
    const parkingId = queryParams.get('parkingId');
    const rentalDatetime = queryParams.get('rentalDatetime');
    const returnDatetime = queryParams.get('returnDatetime');
    const [displayParkingName, setDisplayParkingName] = useState('정보를 불러오는 중...');

    useEffect(() => {
        // 1. useEffect 내부에서 최신 파라미터를 다시 추출합니다.
        if (!parkingId || !rentalDatetime || !returnDatetime) {
            console.error('필수 예약 파라미터가 누락되었습니다.');
            setIsLoading(false);
            return;
        }

        const fetchCars = async () => {
            setIsLoading(true); // 재검색 시 로딩 표시를 위해 추가
            try {
                const cars = await getAvailableCars(parkingId, rentalDatetime, returnDatetime);
                setCarListData(cars);

            } catch (error) {
                console.error('데이터 로드 실패', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCars();
    }, [location.search]); // 2. URL 쿼리 스트링 전체가 변할 때마다 실행

    if (isLoading) return <main className={styles.container}>로딩 중...</main>;

    return (
        <main className={styles.container}>
            <div className={styles.searchHeader}>
                <div className={styles.searchOption}>
                    <div className={styles.locationCont}>
                        <div className={styles.inputCont}>
                            {/* 왼쪽 위치 아이콘 */}
                            <FontAwesomeIcon icon={faLocationDot} />

                            {/* 중앙 텍스트 그룹 (장소 | 날짜) */}
                            <div className={styles.locationTextGroup}>
                                <div className={styles.location}>
                                    {carListData?.[0]?.parking?.parking_name || "장소 선택"}
                                </div>
                                <Link to="/reservation">
                                    <div className={styles.date}>
                                        {/* 2025-12-26T19:30:27 -> 12.26 19:30 형식 */}
                                        {rentalDatetime?.slice(5, 16).replace('-', '.').replace('T', ' ')}
                                        {" ~ "}
                                        {returnDatetime?.slice(5, 16).replace('-', '.').replace('T', ' ')}
                                    </div>
                                </Link>
                            </div>

                            {/* 오른쪽 검색 아이콘 */}
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.faX} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.contentWrapper}>
                <section className={styles.carListSection}>
                    <ul className={styles.carList}>
                        {carListData.length === 0 ? (
                            <div className={styles.emptyCarList}>
                                <div className={styles.emptyIconBox}>
                                    <FontAwesomeIcon icon={faCarSide} className={styles.emptyIcon} />
                                    <div className={styles.ghostCircle}></div>
                                </div>
                                <h3>이용 가능한 차량이 없어요</h3>
                                <p>선택하신 시간에는 모든 차량이 대여 중입니다.<br />시간이나 장소를 변경해 보세요.</p>
                                <Link to="/reservation" className={styles.resetBtn}>다른 주차장 찾기</Link>
                            </div>
                        ) : (
                            carListData.map((car) => (
                                <li key={car.car_id}>
                                    <Link to={`/reservation/carDetail?carId=${car.car_id}&rentalDatetime=${rentalDatetime}&returnDatetime=${returnDatetime}`}>
                                        <article className={styles.carCard}>
                                            <header className={styles.cardHeader}>
                                                <h4>{car.model.model_name}</h4>
                                                <p>{car.car_year}년형</p>
                                                <span className={styles.grade}>{car.car_grade}</span>
                                            </header>

                                            <div className={styles.carImage}>
                                                {car.model.image_url && <img src={car.model.image_url} alt={car.model.model_name} />}
                                            </div>

                                            <div className={styles.carDetails}>
                                                <ul className={styles.optionList}>
                                                    <li><FontAwesomeIcon icon={faCar} /> {car.model.model_category}</li>
                                                    <li><FontAwesomeIcon icon={faCar} /> {car.model.model_seate_num}인승</li>
                                                    <li><FontAwesomeIcon icon={faCar} /> {car.car_fuel}</li>
                                                    <li><FontAwesomeIcon icon={faCar} /> {car.model.model_transmission}</li>
                                                </ul>
                                            </div>

                                            <footer className={styles.priceSection}>
                                                <p>총 <span>{car.totalPrice.toLocaleString()} 원</span></p>
                                            </footer>
                                        </article>
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>
                </section>
            </div>
        </main>
    );
}

export default CarListMobile