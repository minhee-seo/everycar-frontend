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

    useEffect(() => {
        if (!parkingId || !rentalDatetime || !returnDatetime) {
            setIsLoading(false);
            return;
        }

        const fetchCars = async () => {
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
    }, [parkingId, rentalDatetime, returnDatetime]);

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
                                <div className={styles.date}>
                                    {/* 2025-12-26T19:30:27 -> 12.26 19:30 형식 */}
                                    {rentalDatetime?.slice(5, 16).replace('-', '.').replace('T', ' ')}
                                    {" ~ "}
                                    {returnDatetime?.slice(5, 16).replace('-', '.').replace('T', ' ')}
                                </div>
                            </div>

                            {/* 오른쪽 검색 아이콘 */}
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.faX} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.contentWrapper}>
                <aside className={styles.filterSidebar}>
                    <Swiper
                        slidesPerView={4} // 모바일은 4개 정도가 적당합니다.
                        spaceBetween={10}
                        freeMode={true}
                        modules={[FreeMode, Pagination]}
                        className="option"
                    >
                        {/* 필터 항목들은 정적으로 유지하거나 데이터에 따라 맵핑 가능 */}
                        <SwiperSlide><li><label><input type="checkbox" /> Premium</label></li></SwiperSlide>
                        <SwiperSlide><li><label><input type="checkbox" /> Standard</label></li></SwiperSlide>
                        <SwiperSlide><li><label><input type="checkbox" /> 경차</label></li></SwiperSlide>
                        <SwiperSlide><li><label><input type="checkbox" /> SUV</label></li></SwiperSlide>
                    </Swiper>
                </aside>

                <section className={styles.carListSection}>
                    <ul className={styles.carList}>
                        {carListData.length === 0 ? (
                            <div className={styles.emptyCarList}>
                                <p>이용 가능한 차량이 없습니다.</p>
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