import React, { useCallback, useEffect, useState } from 'react';
import styles from './CarDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faChair, faMapSigns, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import ResponsiveSwitch from '../../components/responsive/ResponsiveSwitch.tsx';
import { CarDetailResponse, getCarDetail } from '../../api/carDetail.ts';
import { Link, useLocation } from 'react-router-dom';
import MapView from '../reservation/searchReservation/reservation_mobile/components/MapView.tsx';
import CarNameMapper from '../../utils/carnamemapper.ts';
import { useCarDetail } from '../../hooks/useCarDetail.ts';
import ErrorView from '../../components/common/DataErrorView.tsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.tsx';

interface SubComponentProps extends ReturnType<typeof useCarDetail> {
    data: NonNullable<ReturnType<typeof useCarDetail>['data']>;
}
function CarDetail() {
    const result = useCarDetail();
    const { data, isLoading, error, refetch } = result;

    // 로딩
    if (isLoading) return <LoadingSpinner message="차량 상세 정보를 가져오고 있어요" />;

    // 에러
    if (error) return <ErrorView message={error} onRetry={refetch} />;

    if (!data) return <div className={styles.error}>데이터를 찾을 수 없습니다.</div>;

    // 공통 props 객체 생성
    const commonProps: SubComponentProps = {
        ...result,
        data: data
    };



    return (
        <ResponsiveSwitch
            mobileComponent={<Mobile {...commonProps} />}
            desktopComponent={<Desktop {...commonProps} />}
        />
    );
}

function Desktop({ data, rentalDatetime, returnDatetime, handleMapLoad, formatPeriod, formatPrice }: SubComponentProps) {
    const { car } = data;
    const model = car.model;


    return (
        <div className={styles.container}>
            <section className={styles.ContentSection_article}>
                <div className={styles.rentalTime}>
                    <h2>대여기간</h2>
                    <p>{formatPeriod(rentalDatetime, returnDatetime)}</p>
                </div>
            </section>

            <section className={styles.ContentSection_article}>
                <div className={styles.infoSection}>
                    <div className={styles.carImage}>
                        <img
                            src={`/main/car/${CarNameMapper(car.model.model_name)}.png`}
                            alt={car.model.model_name}
                        />
                    </div>
                    <div className={styles.carInfo}>
                        <div className={styles.infoHeader}>
                            <h3>{model?.model_name}</h3>
                            <span>{car.car_grade}</span>
                        </div>
                        <div className={styles.info}>
                            <ul className={styles.specList}>
                                <li><strong>제조사</strong><span>{model?.model_brand}</span></li>
                                <li><strong>등급</strong><span>{model?.model_category}</span></li>
                                <li><strong>연료</strong><span>{car.car_fuel}</span></li>
                                <li><strong>인원</strong><span>{model?.model_seate_num}인승</span></li>
                                <li><strong>연식</strong><span>{car.car_year}</span></li>
                            </ul>
                        </div>
                        <div className={styles.option}>
                            <h3 className={styles.subTitle}>옵션</h3>
                            <ul className={styles.optionList}>
                                {car.car_options.split(',').map((opt, i) => (
                                    <li key={i}>{opt}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.carPrice}>
                    <div className={styles.priceDisplay}>
                        <span className={styles.priceLabel}>총 금액</span>
                        <p className={styles.priceValue}>
                            {car.totalPrice ? Number(car.totalPrice).toLocaleString() : '0'}원
                        </p>
                    </div>
                    <Link to={`/reservation/contract?carId=${car.car_id}&parkingId=${car.parking?.parking_id}&rentalDatetime=${rentalDatetime}&returnDatetime=${returnDatetime}`}>
                        <button className={styles.reservationButton}>예약하기</button>
                    </Link>
                </div>
            </section>

            <section className={styles.ContentSection_article}>
                <h2>대여 위치</h2>
                <div className={styles.locationSection}>
                    <div className={styles.location}>
                        <div className={styles.locationCont}>
                            <div className={styles.iconCont}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <div className={styles.textCont}>
                                <h3>대여장소</h3>
                                <p>{car.parking?.parking_name}</p>
                                <p>{car.parking?.parking_address}</p>
                            </div>
                        </div>

                        {/* 기간 정보 카드 */}
                        <div className={styles.locationCont}>
                            <div className={styles.iconCont}>
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <div className={styles.textCont}>
                                <h3>대여 기간</h3>
                                <p>{formatPeriod(rentalDatetime, returnDatetime)}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.map}>
                        <div id="map" style={{ width: '100%', height: '250px' }}>
                            <MapView onMapLoad={handleMapLoad} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function Mobile({ data, rentalDatetime, returnDatetime, handleMapLoad, formatPeriod, formatPrice }: SubComponentProps) {
    const { car } = data!;
    const model = car.model;
    return (
        <div className={styles.container}>
            {/* 대여기간 섹션 */}
            <section className={styles.ContentSection_article}>
                <div className={styles.rentalTime}>
                    <h2>대여기간</h2>
                    <p>{formatPeriod(rentalDatetime, returnDatetime)}</p>
                </div>
            </section>

            {/* 차량 정보 섹션 */}
            <section className={styles.ContentSection_article}>
                <div className={styles.infoSection}>
                    <div className={styles.carImage}>
                        <img
                            src={`/main/car/${CarNameMapper(car.model.model_name)}.png`}
                            alt={car.model.model_name}
                        />
                    </div>
                    <div className={styles.carInfo}>
                        <div className={styles.infoHeader}>
                            <h3>{model?.model_name}</h3>
                            <span>{car.car_grade}</span>
                        </div>
                        <div className={styles.info}>
                            <ul className={styles.specList}>
                                <li><strong>제조사</strong><span>{model?.model_brand}</span></li>
                                <li><strong>등급</strong><span>{model?.model_category}</span></li>
                                <li><strong>변속</strong><span>{model?.model_transmission}</span></li>
                                <li><strong>연료</strong><span>{car.car_fuel}</span></li>
                                <li><strong>인원</strong><span>{model?.model_seate_num}인승</span></li>
                                <li><strong>연식</strong><span>{car.car_year}</span></li>
                            </ul>
                        </div>
                        <div className={styles.option}>
                            <h3 className={styles.subTitle}>옵션</h3>
                            <ul className={styles.optionList}>
                                {car.car_options.split(',').map((opt, i) => (
                                    <li key={i}>{opt}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 대여 위치 섹션 */}
            <section className={styles.ContentSection_article}>
                <h2>대여 위치</h2>
                <div className={styles.locationSection}>
                    <div className={styles.location}>
                        <div className={styles.locationCont}>
                            <div className={styles.iconCont}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <div className={styles.textCont}>
                                <h3>대여장소</h3>
                                <p>{car.parking?.parking_name}</p>
                                <p>{car.parking?.parking_address}</p>
                            </div>
                        </div>
                        <div className={styles.locationCont}>
                            <div className={styles.iconCont}>
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <div className={styles.textCont}>
                                <h3>대여 기간</h3>
                                <p>{formatPeriod(rentalDatetime, returnDatetime)}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.map} id="mobile-detail-map">
                        <div id="map" style={{ width: '100%', height: '250px' }}> {/* MapView가 찾는 ID */}
                            <MapView onMapLoad={handleMapLoad} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 하단 결제/예약 섹션 */}
            <section className={styles.ContentSection_article}>
                <div className={styles.carPrice}>
                    <div className={styles.priceDisplay}>
                        <span className={styles.priceLabel}>총 금액</span>
                        <p className={styles.priceValue}>
                            {car.totalPrice ? Number(car.totalPrice).toLocaleString() : '0'}원
                        </p>
                    </div>
                    <Link to={`/reservation/contract?carId=${car.car_id}&parkingId=${car.parking?.parking_id}&rentalDatetime=${rentalDatetime}&returnDatetime=${returnDatetime}`} style={{ width: '100%' }}>
                        <button className={styles.reservationButton}>예약하기</button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
export default CarDetail;
