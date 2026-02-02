import React, { useEffect, useState } from 'react'
import styles from './CarList.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faLocationDot, faCarSide, faMagnifyingGlass, faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { ModelDTO } from '../../types/dto/ModelDTO.ts';
import { CarDTO } from '../../types/dto/CarDTO.ts';
import { ParkingDTO } from '../../types/dto/ParkingDTO.ts';

import { getAvailableCars } from '../../api/reservationApi.ts';
import CarNameMapper from '../../utils/carnamemapper.ts';
import { useCarList } from '../../hooks/useCarList.ts';
import LoadingSpinner from '../../components/common/LoadingSpinner.tsx';
import ErrorView from '../../components/common/DataErrorView.tsx';

export type ParkingInfoResponse = Pick<ParkingDTO, 'parking_name' | 'parking_address'>;
export type ModelInfoResponse = ModelDTO;
export type CarInfoResponse = CarDTO;



function CarListDesktop() {
    const { carListData, isLoading, error, refetch, params, formatPrice } = useCarList();
    const { rentalDatetime, returnDatetime } = params;

    // 로딩 처리
    if (isLoading) return <LoadingSpinner message="이용 가능한 차량을 찾고 있습니다..." />;

    // 에러문구
    if (error) {
        return (
            <main className={styles.container}>
                <ErrorView message={error} onRetry={refetch} />
            </main>
        );
    }
    // // 가격을 쉼표로 포맷팅하는 함수
    // const formatPrice = (price: number) => {
    //     return price.toLocaleString('ko-KR');
    // };

    return (
        <main className={styles.container}>
            <div className={styles.searchHeader}>
                <div className={styles.searchOption}>
                    <div className={styles.locationCont}>
                        <p>대여장소</p>
                        <div className={styles.inputCont}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            {/* 파라미터로 받은 주차장 이름 출력 */}
                            <div className={styles.location}>
                                {carListData?.[0]?.parking?.parking_name}
                            </div>
                        </div>
                    </div>
                    <div className={styles.locationCont}>
                        <p>대여기간</p>
                        <div className={`${styles.inputCont} ${styles.date}`}>
                            {/* 파라미터로 받은 날짜 출력 */}
                            {rentalDatetime}
                            <FontAwesomeIcon icon={faCarSide} className={styles.carSide} />
                            {returnDatetime}
                        </div>
                    </div>
                </div>
                <Link to="/reservation">
                    <button className={styles.researchButton}>주차장 재검색</button>
                </Link>
            </div>

            <div className={styles.contentWrapper}>
                <aside className={styles.filterSidebar}>
                    <h2 className={styles.filterTitle}>차량검색</h2>
                    <ul className={styles.filterList}>
                        <li className={styles.filterItem}>
                            <h3>자동차 모델 검색</h3>
                            <div className={styles.modelSearch}>
                                <input type="text" placeholder='모델명을 입력하세요' />
                                <button>검색</button>
                            </div>
                        </li>
                        <li className={styles.filterItem}>
                            <h3>금액</h3>
                            <input type="range" className={styles.priceSlider} />
                        </li>
                        <li className={styles.filterItem}>
                            <h3>등급</h3>
                            <ul className={styles.checkboxGroup}>
                                <li><label><input type="checkbox" /> Premium</label></li>
                                <li><label><input type="checkbox" /> Standard</label></li>
                            </ul>
                        </li>
                        <li className={styles.filterItem}>
                            <h3>차급</h3>
                            <ul className={styles.checkboxGroup}>
                                <li><label><input type="checkbox" /> 경차</label></li>
                                <li><label><input type="checkbox" /> 소형</label></li>
                                <li><label><input type="checkbox" /> 중형</label></li>
                                <li><label><input type="checkbox" /> 준중형</label></li>
                                <li><label><input type="checkbox" /> 대형</label></li>
                                <li><label><input type="checkbox" /> SUV</label></li>
                            </ul>
                        </li>
                    </ul>
                </aside>
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
                            <ul className={styles.carList}>
                                {carListData.map((car) => (
                                    <li key={car.car_id}>
                                        <Link to={`/reservation/carDetail?carId=${car.car_id}&rentalDatetime=${rentalDatetime}&returnDatetime=${returnDatetime}`}>
                                            <article className={styles.carCard}>
                                                <header className={styles.cardHeader}>
                                                    <div className={styles.title}>
                                                        <h4>{car.model.model_name}</h4>
                                                        <p className={`${styles.gradeBtn} ${styles.premium}`}>{car.car_grade}</p>
                                                    </div>
                                                    <p>{car.car_year}년형</p>
                                                </header>
                                                <div className={styles.carImage}>
                                                    <img
                                                        src={`/main/car/${CarNameMapper(car.model.model_name)}.png`}
                                                        alt={car.model.model_name}
                                                    />
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
                                                    <p>총 <span>{formatPrice(car.totalPrice)} 원</span></p>
                                                </footer>
                                            </article>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ul>
                </section>
            </div>
        </main >
    );
}

export default CarListDesktop