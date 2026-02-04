import styles from './CarListMobile.module.scss';
import './Slide.scss';

import { faCar, faCarSide, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ErrorView from '../../components/common/DataErrorView.tsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.tsx';
import { useCarList } from '../../hooks/useCarList.ts';
import CarNameMapper from '../../utils/carnamemapper.ts';


function CarListMobile() {
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