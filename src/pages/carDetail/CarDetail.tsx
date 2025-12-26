import React, { useEffect, useState } from 'react';
import styles from './CarDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faChair, faMapSigns, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import ResponsiveSwitch from '../../components/responsive/ResponsiveSwitch.tsx';
import { CarDetailResponse, getCarDetail } from '../../api/carDetail.ts';
import { Link, useLocation } from 'react-router-dom';

interface SubComponentProps {
    data: CarDetailResponse;
    rentalDatetime: string;
    returnDatetime: string;
}

function CarDetail() {
    const location = useLocation();
    const [data, setData] = useState<CarDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // URL 파라미터 추출
    const queryParams = new URLSearchParams(location.search);
    const carId = queryParams.get('carId');
    const rentalDatetime = queryParams.get('rentalDatetime');
    const returnDatetime = queryParams.get('returnDatetime');

    useEffect(() => {
        if (!carId || !rentalDatetime || !returnDatetime) return;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const result = await getCarDetail(carId, rentalDatetime, returnDatetime);
                setData(result);
            } catch (error) {
                console.error("상세 정보 호출 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [carId, rentalDatetime, returnDatetime]);

    if (isLoading) return <div className={styles.loading}>정보를 불러오는 중...</div>;
    if (!data) return <div className={styles.error}>데이터를 찾을 수 없습니다.</div>;

    console.log(data);
    return (
        <ResponsiveSwitch
            mobileComponent={<Mobile data={data} rentalDatetime={rentalDatetime!} returnDatetime={returnDatetime!} />}
            desktopComponent={<Desktop data={data} rentalDatetime={rentalDatetime!} returnDatetime={returnDatetime!} />}
        />
    );
}

function Desktop({ data, rentalDatetime, returnDatetime }: SubComponentProps) {
    const { car } = data;
    const model = car.model; // car 객체 내부에 model이 들어있음

    const displayPrice = car.totalPrice;

    const formatPeriod = (start: string, end: string) => {
        const format = (dateStr: string) => {
            // "2025-12-26T19:30:27" -> "2025-12-26 19:30"
            return dateStr.replace('T', ' ').slice(0, 16);
        };
        return `${format(start)} ~ ${format(end)}`;
    };
    return (
        <div className={styles.container}>
            <section className={styles.ContentSection_article}>
                <div className={styles.rentalTime}>
                    <h2>대여기간</h2>
                    {/* "2025-12-26 19:30 ~ 2025-12-28 10:00" 처럼 출력됨 */}
                    <p>{formatPeriod(rentalDatetime, returnDatetime)}</p>
                </div>
            </section>

            <section className={styles.ContentSection_article}>
                <div className={styles.infoSection}>
                    <div className={styles.carImage}>
                        {model?.image_url && <img src={model.image_url} alt={model.model_name} />}
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
                        {/* car.toto가 아니라 totalPrice를 사용합니다. */}
                        <p className={styles.priceValue}>
                            {/* 안전하게 Number로 변환하여 출력 */}
                            {displayPrice ? Number(displayPrice).toLocaleString() : '0'}원
                        </p>
                    </div>
                    <Link to='/reservation/contract'>
                        <button className={styles.reservationButton}>예약하기</button>
                    </Link>
                </div>
            </section>

            <section className={styles.ContentSection_article}>
                <h2>대여 위치</h2>
                <div className={styles.locationSection}>
                    <div className={styles.location}>
                        <div className={styles.locationCont}>
                            <div className={styles.textCont}>
                                <h3>대여장소</h3>
                                <p>{car.parking?.parking_name}</p>
                                <p>{car.parking?.parking_address}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.map} id="detail-map">
                        {/* 여기에 카카오맵을 다시 렌더링하거나 위치 이미지를 넣을 수 있습니다 */}
                    </div>
                </div>
            </section>
        </div>
    );
}

function Mobile({ data, rentalDatetime, returnDatetime }: SubComponentProps) {
    const { car } = data;
    const model = car.model;
    const displayPrice = car.totalPrice;

    // 날짜 포맷팅 함수
    const formatPeriod = (start: string, end: string) => {
        return `${start.replace('T', ' ')} ~ ${end.replace('T', ' ')}`;
    };

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
                        {model?.image_url && <img src={model.image_url} alt={model.model_name} />}
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
                        {/* 지도 영역 */}
                    </div>
                </div>
            </section>

            {/* 하단 결제/예약 섹션 */}
            <section className={styles.ContentSection_article}>
                <div className={styles.carPrice}>
                    <div className={styles.priceDisplay}>
                        <span className={styles.priceLabel}>총 금액</span>
                        <p className={styles.priceValue}>
                            {displayPrice ? Number(displayPrice).toLocaleString() : '0'}원
                        </p>
                    </div>
                    <button className={styles.reservationButton}>예약하기</button>
                </div>
            </section>
        </div>
    );
}
export default CarDetail;
